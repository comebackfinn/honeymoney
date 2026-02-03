'use client';

import { useState } from 'react';

export default function InputForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    monthlySalary: '',
    age: '',
    insuranceYears: '',
    insuranceMonths: '',
    isInvoluntary: false,
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 기본 검증
    if (
      !formData.monthlySalary ||
      !formData.age ||
      formData.insuranceYears === '' ||
      formData.insuranceMonths === ''
    ) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    if (parseFloat(formData.monthlySalary) <= 0) {
      setError('월급은 0보다 커야 합니다.');
      return;
    }

    if (parseFloat(formData.age) < 18 || parseFloat(formData.age) > 100) {
      setError('나이는 18세 이상 100세 이하여야 합니다.');
      return;
    }

    const years = parseFloat(formData.insuranceYears);
    const months = parseFloat(formData.insuranceMonths);

    if (years < 0 || months < 0 || months > 11) {
      setError('가입기간을 올바르게 입력해주세요.');
      return;
    }

    onSubmit({
      monthlySalary: parseFloat(formData.monthlySalary),
      age: parseFloat(formData.age),
      insuranceYears: years,
      insuranceMonths: months,
      isInvoluntary: formData.isInvoluntary,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-md w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        꿀 계산하기
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 월급 입력 */}
        <div>
          <label
            htmlFor="monthlySalary"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            세전 월급 (원)
          </label>
          <input
            id="monthlySalary"
            type="number"
            name="monthlySalary"
            value={formData.monthlySalary}
            onChange={handleChange}
            placeholder="2,000,000"
            className="w-full px-4 py-3 border-2 border-honey-300 rounded-lg focus:outline-none focus:border-honey-500 text-lg"
          />
        </div>

        {/* 나이 입력 */}
        <div>
          <label
            htmlFor="age"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            나이 (세)
          </label>
          <input
            id="age"
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="35"
            className="w-full px-4 py-3 border-2 border-honey-300 rounded-lg focus:outline-none focus:border-honey-500 text-lg"
          />
        </div>

        {/* 가입기간 - 년 */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="insuranceYears"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              가입기간 (년)
            </label>
            <input
              id="insuranceYears"
              type="number"
              name="insuranceYears"
              value={formData.insuranceYears}
              onChange={handleChange}
              placeholder="5"
              min="0"
              className="w-full px-4 py-3 border-2 border-honey-300 rounded-lg focus:outline-none focus:border-honey-500"
            />
          </div>

          {/* 가입기간 - 개월 */}
          <div>
            <label
              htmlFor="insuranceMonths"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              개월
            </label>
            <input
              id="insuranceMonths"
              type="number"
              name="insuranceMonths"
              value={formData.insuranceMonths}
              onChange={handleChange}
              placeholder="6"
              min="0"
              max="11"
              className="w-full px-4 py-3 border-2 border-honey-300 rounded-lg focus:outline-none focus:border-honey-500"
            />
          </div>
        </div>

        {/* 비자발적 퇴사 체크 */}
        <div className="flex items-start gap-3 bg-honey-50 p-4 rounded-lg mt-6">
          <input
            id="isInvoluntary"
            type="checkbox"
            name="isInvoluntary"
            checked={formData.isInvoluntary}
            onChange={handleChange}
            className="w-5 h-5 mt-1 text-bee accent-bee rounded"
          />
          <label
            htmlFor="isInvoluntary"
            className="text-sm text-gray-700 leading-relaxed"
          >
            <strong>회사 폐업, 정리해고, 권고사직</strong> 등{' '}
            <strong>비자발적 퇴사</strong>인 경우 체크해주세요.
            <br />
            <span className="text-xs text-gray-500 mt-1 block">
              (실업급여는 비자발적 퇴사시만 수급 가능합니다)
            </span>
          </label>
        </div>

        {/* 오류 메시지 */}
        {error && (
          <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* 제출 버튼 */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-honey-500 to-bee text-white font-bold py-4 rounded-lg hover:from-honey-600 hover:to-amber-600 transition-all duration-300 text-lg shadow-md mt-8"
        >
          🍯 꿀 계산하기
        </button>
      </form>
    </div>
  );
}
