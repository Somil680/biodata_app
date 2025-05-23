import React from 'react';
import { useBiodata } from '@/context/BiodataContext';
import { BiodataActionTypes } from '@/context/BiodataContext';

interface TemplateShowcaseProps {
  hidePreview?: boolean;
  initialTemplate?: string;
  onTemplateSelect?: (templateId: string) => void;
}

const TemplateShowcase: React.FC<TemplateShowcaseProps> = ({
  hidePreview = false,
  initialTemplate = 'template1',
  onTemplateSelect
}) => {
  const { biodata, dispatch } = useBiodata();
  
  const handleTemplateSelect = (templateId: string) => {
    if (dispatch) {
      dispatch({
        type: BiodataActionTypes.UPDATE_SETTINGS,
        payload: { templateId }
      });
    }
    
    if (onTemplateSelect) {
      onTemplateSelect(templateId);
    }
  };

  return (
    <div className="space-y-4">
      <div 
        className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-all"
        onClick={() => handleTemplateSelect('template1')}
      >
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center">
            {(biodata.settings.templateId === 'template1' || initialTemplate === 'template1') && (
              <div className="h-3 w-3 rounded-full bg-white"></div>
            )}
          </div>
          <h3 className="font-medium">Classic Template</h3>
        </div>
        {!hidePreview && (
          <div className="mt-3 h-40 bg-gray-100 flex items-center justify-center border border-gray-200 rounded">
            <p className="text-gray-500">Template Preview</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateShowcase; 