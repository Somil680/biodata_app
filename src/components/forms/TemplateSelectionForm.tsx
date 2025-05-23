import React, { useState } from 'react';
import { useBiodata } from '@/context/BiodataContext';
import { BiodataActionTypes } from '@/context/BiodataContext';
import TemplateShowcase from '@/components/templates/TemplateShowcase';

const TemplateSelectionForm: React.FC = () => {
  const { biodata, dispatch } = useBiodata();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState<string | null>(null);
  
  const handleSaveSettings = () => {
    if (!biodata.settings.templateId) {
      setErrors({ templateId: 'Please select a template' });
      return;
    }
    
    // Template ID is already being updated in the TemplateShowcase component
    // Just show a success message
    setErrors({});
    setSuccess('Template selected successfully');
    
    // Reset success message after 3 seconds
    setTimeout(() => {
      setSuccess(null);
    }, 3000);
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Select Template</h2>
      <p className="text-gray-600">Choose a template for your biodata. Each template has a different style and layout.</p>
      
      {errors.templateId && (
        <div className="p-3 bg-red-50 text-red-700 rounded-md">
          {errors.templateId}
        </div>
      )}
      
      {success && (
        <div className="p-3 bg-green-50 text-green-700 rounded-md">
          {success}
        </div>
      )}
      
      <div className="mt-6">
        <TemplateShowcase hidePreview={true} />
      </div>
      
      <div className="mt-6 space-y-6">
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Additional Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="tagline" className="block text-sm font-medium text-gray-700 mb-1">
                Tagline (optional)
              </label>
              <input
                id="tagline"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="A short description or tagline for your biodata"
                value={biodata.settings.tagline || ''}
                onChange={(e) => 
                  dispatch({
                    type: BiodataActionTypes.UPDATE_SETTINGS,
                    payload: { tagline: e.target.value }
                  })
                }
              />
              <p className="mt-1 text-sm text-gray-500">
                This will appear under your name in the biodata.
              </p>
            </div>
            
            <div className="flex items-center mt-4">
              <input
                id="shareEnabled"
                type="checkbox"
                className="h-4 w-4 text-[#D40000] focus:ring-[#D40000] border-gray-300 rounded"
                checked={biodata.settings.shareEnabled || false}
                onChange={(e) => 
                  dispatch({
                    type: BiodataActionTypes.UPDATE_SETTINGS,
                    payload: { shareEnabled: e.target.checked }
                  })
                }
              />
              <label htmlFor="shareEnabled" className="ml-2 block text-sm text-gray-700">
                Enable sharing options for this biodata
              </label>
            </div>
            
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Privacy Settings</h4>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    id="showContactDetails"
                    type="checkbox"
                    className="h-4 w-4 text-[#D40000] focus:ring-[#D40000] border-gray-300 rounded"
                    checked={biodata.settings.privacySettings?.showContactDetails || false}
                    onChange={(e) => 
                      dispatch({
                        type: BiodataActionTypes.UPDATE_SETTINGS,
                        payload: { 
                          privacySettings: { 
                            ...biodata.settings.privacySettings,
                            showContactDetails: e.target.checked 
                          } 
                        }
                      })
                    }
                  />
                  <label htmlFor="showContactDetails" className="ml-2 block text-sm text-gray-700">
                    Show contact details
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="showEmail"
                    type="checkbox"
                    className="h-4 w-4 text-[#D40000] focus:ring-[#D40000] border-gray-300 rounded"
                    checked={biodata.settings.privacySettings?.showEmail || false}
                    onChange={(e) => 
                      dispatch({
                        type: BiodataActionTypes.UPDATE_SETTINGS,
                        payload: { 
                          privacySettings: { 
                            ...biodata.settings.privacySettings,
                            showEmail: e.target.checked 
                          } 
                        }
                      })
                    }
                  />
                  <label htmlFor="showEmail" className="ml-2 block text-sm text-gray-700">
                    Show email address
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="showAddress"
                    type="checkbox"
                    className="h-4 w-4 text-[#D40000] focus:ring-[#D40000] border-gray-300 rounded"
                    checked={biodata.settings.privacySettings?.showAddress || false}
                    onChange={(e) => 
                      dispatch({
                        type: BiodataActionTypes.UPDATE_SETTINGS,
                        payload: { 
                          privacySettings: { 
                            ...biodata.settings.privacySettings,
                            showAddress: e.target.checked 
                          } 
                        }
                      })
                    }
                  />
                  <label htmlFor="showAddress" className="ml-2 block text-sm text-gray-700">
                    Show complete address
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="showIncome"
                    type="checkbox"
                    className="h-4 w-4 text-[#D40000] focus:ring-[#D40000] border-gray-300 rounded"
                    checked={biodata.settings.privacySettings?.showIncome || false}
                    onChange={(e) => 
                      dispatch({
                        type: BiodataActionTypes.UPDATE_SETTINGS,
                        payload: { 
                          privacySettings: { 
                            ...biodata.settings.privacySettings,
                            showIncome: e.target.checked 
                          } 
                        }
                      })
                    }
                  />
                  <label htmlFor="showIncome" className="ml-2 block text-sm text-gray-700">
                    Show income details
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <button
        type="button"
        className="px-6 py-2 bg-[#D40000] text-white rounded-md hover:bg-[#b30000] transition-colors"
        onClick={handleSaveSettings}
      >
        Save & Continue
      </button>
    </div>
  );
};

export default TemplateSelectionForm; 