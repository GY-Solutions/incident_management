import 'survey-core/survey-core.css';
import './survey-custom.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';

const surveyJson = {
  "title": "Event Description",
  "description": "Describe what happened during the medication event",
  "logoPosition": "right",
  "pages": [
    {
      "name": "page1",
      "title": "Event Description",
      "description": "Describe what happened during the medication event",
      "elements": [
        {
          "type": "comment",
          "name": "question1",
          "title": "Describe the facts of what happened",
          "placeholder": "Please provide a detailed description of the medication event, including sequence of events",
          "isRequired": true
        },
        {
          "type": "checkbox",
          "name": "question2",
          "title": "Select all that were involved",
          "isRequired": true,
          "choices": [
            {
              "value": "medication",
              "text": "Medication"
            },
            {
              "value": "medication_device",
              "text": "Medication Device"
            },
            {
              "value": "clinical_services",
              "text": "Clinical Services"
            }
          ]
        }
      ]
    },
    {
      "name": "page2",
      "title": "Event Details",
      "elements": [
        {
          "type": "dropdown",
          "name": "event_type",
          "title": "Event Type",
          "isRequired": true,
          "choices": [
            "Medication Error",
            "Adverse Drug Reaction",
            "Near Miss",
            "Equipment Malfunction"
          ]
        },
        {
          "type": "dropdown",
          "name": "severity",
          "title": "Severity Level",
          "isRequired": true,
          "choices": [
            "No Harm",
            "Minor Harm",
            "Moderate Harm",
            "Severe Harm",
            "Death"
          ]
        },
        {
          "type": "text",
          "name": "location",
          "title": "Location",
          "placeholder": "Ward, unit, or department",
          "isRequired": true
        },
        {
          "type": "text",
          "name": "medication_name",
          "title": "Medication Name",
          "placeholder": "Generic or brand name"
        }
      ]
    },
    {
      "name": "page3",
      "title": "Review & Submit",
      "elements": [
        {
          "type": "text",
          "name": "reporter_name",
          "title": "Reporter Name",
          "placeholder": "Your name and title",
          "isRequired": true
        },
        {
          "type": "comment",
          "name": "additional_comments",
          "title": "Additional Comments",
          "placeholder": "Any additional information or comments"
        }
      ]
    }
  ]
};


export default function SurveyComponent() {
  const survey = new Model(surveyJson);

  // Enable progress bar
  survey.showProgressBar = "top";
  survey.progressBarType = "buttons";
  
  // Add submit logic
  survey.onComplete.add((sender) => {
    console.log("Survey results:", sender.data);
    alert("Survey completed! Check console for results.");
  });

  return <Survey model={survey} />;
}