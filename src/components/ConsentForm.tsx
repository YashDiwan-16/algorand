"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiTrash2 } from "react-icons/fi";

interface ConsentFormProps {
  onSubmit: (formData: ConsentFormData) => void;
  initialData?: Partial<ConsentFormData>;
}

export interface ConsentFormData {
  organization: string;
  domain: string;
  purpose: string;
  description: string;
  dataRequested: string[];
  expiryPeriod: string;
}

const ConsentForm: React.FC<ConsentFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<ConsentFormData>({
    organization: initialData?.organization || '',
    domain: initialData?.domain || '',
    purpose: initialData?.purpose || '',
    description: initialData?.description || '',
    dataRequested: initialData?.dataRequested || [''],
    expiryPeriod: initialData?.expiryPeriod || '30' // Default 30 days
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ConsentFormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is changed
    if (errors[name as keyof ConsentFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleAddDataField = () => {
    setFormData({
      ...formData,
      dataRequested: [...formData.dataRequested, '']
    });
  };

  const handleRemoveDataField = (index: number) => {
    setFormData({
      ...formData,
      dataRequested: formData.dataRequested.filter((_, i) => i !== index)
    });
  };

  const handleDataChange = (index: number, value: string) => {
    const newDataRequested = [...formData.dataRequested];
    newDataRequested[index] = value;
    setFormData({
      ...formData,
      dataRequested: newDataRequested
    });
    
    // Clear any errors related to data requested
    if (errors.dataRequested) {
      setErrors(prev => ({
        ...prev,
        dataRequested: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ConsentFormData, string>> = {};
    
    if (!formData.organization.trim()) {
      newErrors.organization = 'Organization name is required';
    }
    
    if (!formData.domain.trim()) {
      newErrors.domain = 'Domain is required';
    } else if (!/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/.test(formData.domain)) {
      newErrors.domain = 'Please enter a valid domain (e.g., example.com)';
    }
    
    if (!formData.purpose.trim()) {
      newErrors.purpose = 'Purpose is required';
    }
    
    const emptyDataFields = formData.dataRequested.some(item => !item.trim());
    if (formData.dataRequested.length === 0 || emptyDataFields) {
      newErrors.dataRequested = 'At least one data field is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">
          Organization Name
        </label>
        <input
          type="text"
          id="organization"
          name="organization"
          value={formData.organization}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md ${errors.organization ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="Organization requesting consent"
        />
        {errors.organization && <p className="mt-1 text-sm text-red-500">{errors.organization}</p>}
      </div>

      <div>
        <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-1">
          Domain
        </label>
        <input
          type="text"
          id="domain"
          name="domain"
          value={formData.domain}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md ${errors.domain ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="example.com"
        />
        {errors.domain && <p className="mt-1 text-sm text-red-500">{errors.domain}</p>}
      </div>

      <div>
        <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-1">
          Purpose
        </label>
        <input
          type="text"
          id="purpose"
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md ${errors.purpose ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="Purpose for requesting data"
        />
        {errors.purpose && <p className="mt-1 text-sm text-red-500">{errors.purpose}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Data Requested
        </label>
        {formData.dataRequested.map((data, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={data}
              onChange={(e) => handleDataChange(index, e.target.value)}
              className={`flex-1 px-3 py-2 border rounded-md ${errors.dataRequested ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Data field name"
            />
            <button
              type="button"
              onClick={() => handleRemoveDataField(index)}
              className="ml-2 text-red-500 hover:text-red-700"
              disabled={formData.dataRequested.length === 1}
            >
              <FiTrash2 size={18} />
            </button>
          </div>
        ))}
        {errors.dataRequested && (
          <p className="mt-1 text-sm text-red-500">{errors.dataRequested}</p>
        )}
        <button
          type="button"
          onClick={handleAddDataField}
          className="mt-1 flex items-center text-sm text-blue-500 hover:text-blue-700"
        >
          <FiPlus size={16} className="mr-1" /> Add another data field
        </button>
      </div>

      <div>
        <label htmlFor="expiryPeriod" className="block text-sm font-medium text-gray-700 mb-1">
          Expiry Period
        </label>
        <select
          id="expiryPeriod"
          name="expiryPeriod"
          value={formData.expiryPeriod}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="30">30 days</option>
          <option value="90">90 days</option>
          <option value="180">180 days</option>
          <option value="365">1 year</option>
          <option value="never">Never</option>
        </select>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Detailed description of consent request"
        />
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ConsentForm; 