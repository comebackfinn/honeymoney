/**
 * 2026년 기준 실업급여 계산 로직
 * 고용보험 가입기간과 나이별 지급일수 자동 계산
 */

// 2026년 최저 실업급여 (시간급 12,600원 기준, 8시간 근무)
const MIN_DAILY_BENEFIT = 51750;

// 2026년 최대 실업급여 (상한액)
const MAX_DAILY_BENEFIT = 76000;

/**
 * 지급일수 테이블 (나이 + 가입기간별)
 * key: `${age}-${years}` (age는 10세 단위, years는 가입연수)
 */
const BENEFIT_DAYS_TABLE = {
  // 50세 미만 (18-49)
  '18-0': 90, '18-1': 90, '18-2': 90, '18-3': 90, '18-4': 90, '18-5': 120,
  '18-10': 150, '18-15': 180, '18-20': 210,
  // 50-59세
  '50-0': 120, '50-1': 120, '50-2': 120, '50-3': 150, '50-4': 150, '50-5': 180,
  '50-10': 210, '50-15': 240, '50-20': 270,
  // 60세 이상
  '60-0': 150, '60-1': 150, '60-2': 180, '60-3': 180, '60-4': 210, '60-5': 210,
  '60-10': 240, '60-15': 270, '60-20': 300,
};

/**
 * 나이 범위에 따른 카테고리 반환
 */
function getAgeCategory(age) {
  if (age < 50) return 18;
  if (age < 60) return 50;
  return 60;
}

/**
 * 가입기간에 따른 기준 년수 반환 (정확한 테이블 매칭)
 */
function getInsurancePeriodCategory(years, months) {
  const totalMonths = years * 12 + months;

  if (totalMonths < 12) return 0;
  if (totalMonths < 24) return 1;
  if (totalMonths < 36) return 2;
  if (totalMonths < 48) return 3;
  if (totalMonths < 60) return 4;
  if (totalMonths < 120) return 5;
  if (totalMonths < 180) return 10;
  if (totalMonths < 240) return 15;
  return 20;
}

/**
 * 지급일수 조회
 */
function getBenefitDays(age, years, months) {
  const ageCategory = getAgeCategory(age);
  const periodCategory = getInsurancePeriodCategory(years, months);
  const key = `${ageCategory}-${periodCategory}`;

  return BENEFIT_DAYS_TABLE[key] || 90; // 기본값 90일
}

/**
 * 1일 실업급여 계산
 * @param {number} monthlySalary - 월급 (세전)
 * @returns {number} 1일 실업급여
 */
function calculateDailyBenefit(monthlySalary) {
  // 평균임금 = 월급 / 30
  const averageWage = monthlySalary / 30;

  // 1일 실업급여 = 평균임금 × 60%
  let dailyBenefit = averageWage * 0.6;

  // 상한액 제한
  if (dailyBenefit > MAX_DAILY_BENEFIT) {
    dailyBenefit = MAX_DAILY_BENEFIT;
  }

  // 하한액 제한
  if (dailyBenefit < MIN_DAILY_BENEFIT) {
    dailyBenefit = MIN_DAILY_BENEFIT;
  }

  return Math.floor(dailyBenefit);
}

/**
 * 메인 계산 함수
 */
export function calculateUnemploymentBenefit(inputData) {
  const {
    monthlySalary,
    age,
    insuranceYears,
    insuranceMonths,
    isInvoluntary,
  } = inputData;

  // 유효성 검증
  if (
    !monthlySalary ||
    monthlySalary < 0 ||
    !age ||
    age < 18 ||
    age > 100 ||
    !insuranceYears ||
    insuranceYears < 0 ||
    !insuranceMonths ||
    insuranceMonths < 0 ||
    insuranceMonths > 11
  ) {
    throw new Error('입력값이 올바르지 않습니다.');
  }

  // 비자발적 퇴사가 아니면 0 반환
  if (!isInvoluntary) {
    return {
      isEligible: false,
      reason: '실업급여는 비자발적 퇴사(회사 폐업, 정리해고, 권고사직 등)시만 수급 가능합니다.',
      dailyBenefit: 0,
      totalDays: 0,
      totalAmount: 0,
      averageWage: 0,
    };
  }

  // 가입기간 확인 (최소 6개월)
  const totalMonths = insuranceYears * 12 + insuranceMonths;
  if (totalMonths < 6) {
    return {
      isEligible: false,
      reason: '실업급여는 고용보험 가입기간이 최소 6개월 이상이어야 합니다.',
      dailyBenefit: 0,
      totalDays: 0,
      totalAmount: 0,
      averageWage: 0,
    };
  }

  // 계산
  const averageWage = Math.floor(monthlySalary / 30);
  const dailyBenefit = calculateDailyBenefit(monthlySalary);
  const totalDays = getBenefitDays(age, insuranceYears, insuranceMonths);
  const totalAmount = dailyBenefit * totalDays;

  return {
    isEligible: true,
    averageWage,
    dailyBenefit,
    totalDays,
    totalAmount,
    ageCategory: getAgeCategory(age),
    insurancePeriodCategory: getInsurancePeriodCategory(
      insuranceYears,
      insuranceMonths
    ),
    details: {
      maxBenefit: MAX_DAILY_BENEFIT,
      minBenefit: MIN_DAILY_BENEFIT,
      benefitRatio: 0.6,
    },
  };
}

/**
 * 입력값 검증만 수행
 */
export function validateInput(inputData) {
  const { monthlySalary, age, insuranceYears, insuranceMonths } = inputData;

  if (!monthlySalary || monthlySalary <= 0) {
    return { valid: false, message: '월급을 입력해주세요.' };
  }

  if (!age || age < 18 || age > 100) {
    return { valid: false, message: '나이를 올바르게 입력해주세요. (18-100)' };
  }

  if (
    insuranceYears === undefined ||
    insuranceYears < 0 ||
    insuranceMonths === undefined ||
    insuranceMonths < 0 ||
    insuranceMonths > 11
  ) {
    return {
      valid: false,
      message: '고용보험 가입기간을 올바르게 입력해주세요.',
    };
  }

  return { valid: true };
}
