import 'survey-core/survey-core.css';
import './survey-custom.css';
import { Model } from 'survey-core';

import { Survey } from 'survey-react-ui';

const surveyJson = {
  "title": "Pharmacy Medication Incident",
  "logoPosition": "right",
  "pages": [
    {
      "name": "page1",
      "title": "Event Description",
      "elements": [
        {
          "type": "comment",
          "name": "question1",
          "title": "Describe the facts of what happened ",
          "isRequired": true
        },
        {
          "type": "checkbox",
          "name": "question2",
          "title": "Select all that were involved?",
          "isRequired": true,
          "choices": [
            {
              "value": "Item 1",
              "text": "Medication"
            },
            {
              "value": "Item 2",
              "text": "Medication Device"
            },
            {
              "value": "Item 3",
              "text": "Clinical Services"
            }
          ]
        },
        {
          "type": "checkbox",
          "name": "question3",
          "visibleIf": "{question2} allof ['Item 3']",
          "title": "Clinical services involved",
          "choices": [
            "Chronic disease management",
            "Clinical chart review",
            "Drug information counseling"
          ]
        }
      ]
    },
    {
      "name": "page2",
      "title": "Patient(s) Details",
      "elements": [
        {
          "type": "text",
          "name": "question4",
          "title": "Unique Id (External Reference) ",
          "isRequired": true
        },
        {
          "type": "text",
          "name": "question5",
          "title": "Date of Birth",
          "isRequired": true
        },
        {
          "type": "radiogroup",
          "name": "question6",
          "title": "Gender",
          "isRequired": true,
          "choices": [
            {
              "value": "Item 1",
              "text": "Female"
            },
            {
              "value": "Item 2",
              "text": "Male"
            },
            {
              "value": "Item 3",
              "text": "Others"
            }
          ]
        },
        {
          "type": "text",
          "name": "question7",
          "title": "Transaction/ Prescription Number(s) (Tx/Rx #'s)"
        },
        {
          "type": "text",
          "name": "question8",
          "title": "Was a LEOI form submitted?",
          "isRequired": true
        }
      ]
    },
    {
      "name": "page3",
      "title": "WHAT Happened (Event Category/Incident Type)",
      "elements": [
        {
          "type": "checkbox",
          "name": "question9",
          "title": "What happened (select all that apply) ",
          "isRequired": true,
          "choices": [
            {
              "value": "Item 1",
              "text": "Administration time/timing/hour of administration (HOA) incorrect"
            },
            {
              "value": "Item 2",
              "text": "Allergy/adverse drug reaction (ADR)/adverse event following immunization (AEFI)"
            },
            {
              "value": "Item 3",
              "text": "Disclosed personal health information without authority"
            }
          ]
        },
        {
          "type": "checkbox",
          "name": "question10",
          "visibleIf": "{question9} allof ['Item 1']",
          "title": "Administration time/timing/hour of administration (HOA) incorrect",
          "isRequired": true,
          "choices": [
            {
              "value": "Item 1",
              "text": "Hour of administration too early"
            },
            {
              "value": "Item 2",
              "text": "Hour of administration too late"
            },
            {
              "value": "Item 3",
              "text": "Hour of administration both too early and too late"
            },
            {
              "value": "Item 4",
              "text": "Timing (e.g. take separate from other meds, within 30 mins) incorrect"
            }
          ]
        }
      ]
    },
    {
      "name": "page4",
      "title": "Stages Involved",
      "elements": [
        {
          "type": "checkbox",
          "name": "question9",
          "title": "What happened (select all that apply) ",
          "isRequired": true,
          "choices": [
            {
              "value": "Item 1",
              "text": "Administration time/timing/hour of administration (HOA) incorrect"
            },
            {
              "value": "Item 2",
              "text": "Allergy/adverse drug reaction (ADR)/adverse event following immunization (AEFI)"
            },
            {
              "value": "Item 3",
              "text": "Disclosed personal health information without authority"
            }
          ]
        },
        {
          "type": "checkbox",
          "name": "question10",
          "visibleIf": "{question9} allof ['Item 1']",
          "title": "Administration time/timing/hour of administration (HOA) incorrect",
          "isRequired": true,
          "choices": [
            {
              "value": "Item 1",
              "text": "Hour of administration too early"
            },
            {
              "value": "Item 2",
              "text": "Hour of administration too late"
            },
            {
              "value": "Item 3",
              "text": "Hour of administration both too early and too late"
            },
            {
              "value": "Item 4",
              "text": "Timing (e.g. take separate from other meds, within 30 mins) incorrect"
            }
          ]
        }
      ]
    },
    {
      "name": "page5",
      "title": "Risk & Harm Details",
      "elements": [
        {
          "type": "checkbox",
          "name": "question9",
          "title": "What happened (select all that apply) ",
          "isRequired": true,
          "choices": [
            {
              "value": "Item 1",
              "text": "Administration time/timing/hour of administration (HOA) incorrect"
            },
            {
              "value": "Item 2",
              "text": "Allergy/adverse drug reaction (ADR)/adverse event following immunization (AEFI)"
            },
            {
              "value": "Item 3",
              "text": "Disclosed personal health information without authority"
            }
          ]
        },
        {
          "type": "checkbox",
          "name": "question10",
          "visibleIf": "{question9} allof ['Item 1']",
          "title": "Administration time/timing/hour of administration (HOA) incorrect",
          "isRequired": true,
          "choices": [
            {
              "value": "Item 1",
              "text": "Hour of administration too early"
            },
            {
              "value": "Item 2",
              "text": "Hour of administration too late"
            },
            {
              "value": "Item 3",
              "text": "Hour of administration both too early and too late"
            },
            {
              "value": "Item 4",
              "text": "Timing (e.g. take separate from other meds, within 30 mins) incorrect"
            }
          ]
        }
      ]
    }
  ]
};


export default function SurveyComponent() {
  const survey = new Model(surveyJson);

  survey.showProgressBar = "top";
  survey.progressBarType = "buttons"; 
  
   // (Optional) add submit logic
  survey.onComplete.add((sender) => {
    console.log("Survey results:", sender.data);
  });

  return <Survey model={survey} />;
}