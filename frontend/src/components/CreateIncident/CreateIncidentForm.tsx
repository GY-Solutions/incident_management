import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Save, User, MapPin, Calendar, Tag, Pill, Activity } from 'lucide-react';

const CreateIncidentForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'incident',
    severity: 'minor_harm',
    location: '',
    category: 'medication_error',
    reportedBy: '',
    medicationName: '',
    medicationClass: '',
    patientAge: '',
    patientGender: 'female',
    harmLevel: 'no_harm',
    preventability: 'preventable',
    immediateActions: '',
    witnesses: '',
    contributingFactors: '',
    clinicalOutcome: '',
    photos: null as File[] | null,
    tags: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        photos: Array.from(e.target.files!)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/incidents');
    }, 1500);
  };

  const categories = [
    'medication_error',
    'adverse_drug_reaction',
    'medication_omission',
    'wrong_dose',
    'wrong_drug',
    'wrong_patient',
    'wrong_route',
    'wrong_time',
    'prescribing_error',
    'dispensing_error',
    'administration_error'
  ];

  const medicationClasses = [
    'Analgesics',
    'Antibiotics',
    'Anticoagulants',
    'Antidiabetics',
    'Antihypertensives',
    'Cardiovascular',
    'CNS Medications',
    'Electrolytes',
    'Hormones',
    'Immunosuppressants',
    'Other'
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Activity className="mr-3 h-8 w-8 text-blue-600" />
          Report Medication Event
        </h1>
        <p className="text-gray-600 mt-2">Please provide detailed information about the medication incident or near miss.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 space-y-8">
          {/* Basic Information */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <AlertCircle className="mr-2 h-5 w-5" />
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Event Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Brief description of the medication event"
                  required
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                  Type *
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="incident">Incident</option>
                  <option value="near_miss">Near Miss</option>
                </select>
              </div>

              <div>
                <label htmlFor="harmLevel" className="block text-sm font-medium text-gray-700 mb-2">
                  Harm Level *
                </label>
                <select
                  id="harmLevel"
                  name="harmLevel"
                  value={formData.harmLevel}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="no_harm">No Harm</option>
                  <option value="minor_harm">Minor Harm</option>
                  <option value="moderate_harm">Moderate Harm</option>
                  <option value="severe_harm">Severe Harm</option>
                  <option value="death">Death</option>
                </select>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Event Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  Location *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ward, unit, or department where event occurred"
                  required
                />
              </div>
            </div>
          </div>

          {/* Medication Information */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Pill className="mr-2 h-5 w-5" />
              Medication Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="medicationName" className="block text-sm font-medium text-gray-700 mb-2">
                  Medication Name *
                </label>
                <input
                  type="text"
                  id="medicationName"
                  name="medicationName"
                  value={formData.medicationName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Generic or brand name"
                  required
                />
              </div>

              <div>
                <label htmlFor="medicationClass" className="block text-sm font-medium text-gray-700 mb-2">
                  Medication Class *
                </label>
                <select
                  id="medicationClass"
                  name="medicationClass"
                  value={formData.medicationClass}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select medication class</option>
                  {medicationClasses.map(medClass => (
                    <option key={medClass} value={medClass}>{medClass}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="patientAge" className="block text-sm font-medium text-gray-700 mb-2">
                  Patient Age
                </label>
                <input
                  type="number"
                  id="patientAge"
                  name="patientAge"
                  value={formData.patientAge}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Patient age"
                  min="0"
                  max="120"
                />
              </div>

              <div>
                <label htmlFor="patientGender" className="block text-sm font-medium text-gray-700 mb-2">
                  Patient Gender
                </label>
                <select
                  id="patientGender"
                  name="patientGender"
                  value={formData.patientGender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Detailed Description */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Event Details</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Detailed Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe what happened, including sequence of events"
                  required
                />
              </div>

              <div>
                <label htmlFor="immediateActions" className="block text-sm font-medium text-gray-700 mb-2">
                  Immediate Actions Taken
                </label>
                <textarea
                  id="immediateActions"
                  name="immediateActions"
                  value={formData.immediateActions}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="What immediate actions were taken after the event?"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contributingFactors" className="block text-sm font-medium text-gray-700 mb-2">
                    Contributing Factors
                  </label>
                  <textarea
                    id="contributingFactors"
                    name="contributingFactors"
                    value={formData.contributingFactors}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Factors that contributed to this event"
                  />
                </div>

                <div>
                  <label htmlFor="clinicalOutcome" className="block text-sm font-medium text-gray-700 mb-2">
                    Clinical Outcome
                  </label>
                  <textarea
                    id="clinicalOutcome"
                    name="clinicalOutcome"
                    value={formData.clinicalOutcome}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Patient outcome and any treatment required"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="witnesses" className="block text-sm font-medium text-gray-700 mb-2">
                  Witnesses
                </label>
                <textarea
                  id="witnesses"
                  name="witnesses"
                  value={formData.witnesses}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Names and contact information of witnesses"
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Additional Information</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="reportedBy" className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline h-4 w-4 mr-1" />
                  Reported By *
                </label>
                <input
                  type="text"
                  id="reportedBy"
                  name="reportedBy"
                  value={formData.reportedBy}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your name and title"
                  required
                />
              </div>

              <div>
                <label htmlFor="preventability" className="block text-sm font-medium text-gray-700 mb-2">
                  Preventability Assessment
                </label>
                <select
                  id="preventability"
                  name="preventability"
                  value={formData.preventability}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="preventable">Preventable</option>
                  <option value="probably_preventable">Probably Preventable</option>
                  <option value="probably_not_preventable">Probably Not Preventable</option>
                  <option value="not_preventable">Not Preventable</option>
                </select>
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                  <Tag className="inline h-4 w-4 mr-1" />
                  Tags
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add tags separated by commas (e.g., insulin, dosing, diabetes)"
                />
              </div>

              <div>
                <label htmlFor="photos" className="block text-sm font-medium text-gray-700 mb-2">
                  Photos/Documentation
                </label>
                <input
                  type="file"
                  id="photos"
                  name="photos"
                  onChange={handleFileChange}
                  multiple
                  accept="image/*"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-sm text-gray-500 mt-1">Upload any relevant photos or documents (optional)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-xl flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center"
          >
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateIncidentForm;