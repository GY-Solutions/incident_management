import 'survey-core/survey-core.css';
import './survey-custom.css';
import { Model } from 'survey-core';
import { useNavigate } from 'react-router-dom';

import { Survey } from 'survey-react-ui';

const surveyJson = {
  "title": "Medication Safety Incident Report",
  "description": "Please provide detailed information about the medication incident or near miss event",
  "logoPosition": "right",
  "showProgressBar": "top",
  "progressBarType": "buttons",
  "showQuestionNumbers": "off",
  "requiredText": "*",
  "showCompletedPage": true,
  "completedHtml": "<div class='sv-completedpage'><h3>Thank you for your report!</h3><p>Your medication incident report has been submitted successfully. Our safety team will review this report and take appropriate action.</p></div>",
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
          "description": "Please provide a detailed description of the medication event, including sequence of events",
          "isRequired": true,
          "rows": 4,
          "placeholder": "Describe what happened, when it occurred, and any immediate actions taken..."
        },
        {
          "type": "checkbox",
          "name": "question2",
          "title": "Select all that were involved in this event",
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
          "title": "Which clinical services were involved?",
          "description": "Select all clinical services that were part of this event",
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
      "description": "Provide patient information (use anonymous identifiers where possible)",
      "elements": [
        {
          "type": "text",
          "name": "question4",
          "title": "Unique ID (External Reference)",
          "description": "Patient identifier or case reference number",
          "isRequired": true,
          "placeholder": "Enter patient ID or reference number"
        },
        {
          "type": "date",
          "name": "question5",
          "title": "Date of Birth",
          "description": "Patient's date of birth (for age calculation)",
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
              "text": "Other"
            },
            {
              "value": "Item 4",
              "text": "Prefer not to say"
            }
          ]
        },
        {
          "type": "text",
          "name": "question7",
          "title": "Transaction/Prescription Number(s) (Tx/Rx #'s)",
          "description": "Enter relevant prescription or transaction numbers",
          "placeholder": "Rx123456, Tx789012"
        },
        {
          "type": "radiogroup",
          "name": "question8",
          "title": "Was a LEOI form submitted?",
          "description": "Learning from Excellence, Occurrence and Incident form",
          "isRequired": true,
          "choices": [
            "Yes",
            "No",
            "Not applicable"
          ]
        }
      ]
    },
    {
      "name": "page3",
      "title": "WHAT Happened (Event Category/Incident Type)",
      "description": "Categorize the type of medication event that occurred",
      "elements": [
        {
          "type": "checkbox",
          "name": "question9",
          "title": "What happened? (select all that apply)",
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
              "text": "Wrong medication dispensed"
            },
            {
              "value": "Item 4",
              "text": "Wrong dose administered"
            },
            {
              "value": "Item 5",
              "text": "Wrong patient received medication"
            },
            {
              "value": "Item 6",
              "text": "Wrong route of administration"
            },
            {
              "value": "Item 7",
              "text": "Medication omission"
            },
            {
              "value": "Item 8",
              "text": "Prescribing error"
            },
            {
              "value": "Item 9",
              "text": "Other (please specify in comments)"
            }
          ]
        },
        {
          "type": "checkbox",
          "name": "question10",
          "visibleIf": "{question9} allof ['Item 1']",
          "title": "Administration time/timing/hour of administration (HOA) incorrect",
          "description": "Specify the type of timing error",
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
              "text": "Timing instructions not followed (e.g., take separate from other meds, within 30 mins)"
            }
          ]
        },
        {
          "type": "comment",
          "name": "additional_details",
          "title": "Additional details about the event",
          "description": "Provide any additional context or details about what happened",
          "rows": 3,
          "placeholder": "Any additional information that would help understand this event..."
        }
      ]
    },
    {
      "name": "page4",
      "title": "Stages Involved",
      "description": "Identify which stages of the medication process were involved",
      "elements": [
        {
          "type": "checkbox",
          "name": "stages_involved",
          "title": "Which stages of the medication process were involved? (select all that apply)",
          "isRequired": true,
          "choices": [
            {
              "value": "Item 1",
              "text": "Prescribing"
            },
            {
              "value": "Item 2",
              "text": "Transcribing"
            },
            {
              "value": "Item 3",
              "text": "Dispensing"
            },
            {
              "value": "Item 4",
              "text": "Administration"
            },
            {
              "value": "Item 5",
              "text": "Monitoring"
            },
            {
              "value": "Item 6",
              "text": "Documentation"
            }
          ]
        },
        {
          "type": "text",
          "name": "medication_name",
          "title": "Medication Name",
          "description": "Generic or brand name of the medication involved",
          "isRequired": true,
          "placeholder": "Enter medication name"
        },
        {
          "type": "dropdown",
          "name": "medication_class",
          "title": "Medication Class",
          "description": "Select the therapeutic class of the medication",
          "isRequired": true,
          "choices": [
            "Analgesics",
            "Antibiotics", 
            "Anticoagulants",
            "Antidiabetics",
            "Antihypertensives",
            "Cardiovascular",
            "CNS Medications",
            "Electrolytes",
            "Hormones",
            "Immunosuppressants",
            "Other"
          ]
        }
      ]
    },
    {
      "name": "page5",
      "title": "Risk & Harm Details",
      "description": "Assess the risk level and any harm that occurred",
      "elements": [
        {
          "type": "radiogroup",
          "name": "harm_level",
          "title": "What level of harm occurred?",
          "isRequired": true,
          "choices": [
            {
              "value": "Item 1",
              "text": "No harm - Near miss or error with no patient impact"
            },
            {
              "value": "Item 2",
              "text": "Minor harm - Temporary harm requiring minimal intervention"
            },
            {
              "value": "Item 3",
              "text": "Moderate harm - Temporary harm requiring intervention"
            },
            {
              "value": "Item 4", 
              "text": "Severe harm - Permanent harm or life-threatening situation"
            },
            {
              "value": "Item 5",
              "text": "Death - Event contributed to patient death"
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "preventability",
          "title": "How preventable was this event?",
          "description": "Assess whether this event could have been prevented",
          "isRequired": true,
          "choices": [
            "Preventable",
            "Probably preventable", 
            "Probably not preventable",
            "Not preventable"
          ]
        },
        {
          "type": "comment",
          "name": "contributing_factors",
          "title": "Contributing Factors",
          "description": "What factors contributed to this event? (e.g., workload, communication, system issues)",
          "rows": 3,
          "placeholder": "Describe factors that may have contributed to this event..."
        },
        {
          "type": "comment", 
          "name": "immediate_actions",
          "title": "Immediate Actions Taken",
          "description": "What immediate actions were taken after the event was discovered?",
          "rows": 3,
          "placeholder": "Describe any immediate interventions or actions taken..."
        },
        {
          "type": "text",
          "name": "reporter_name",
          "title": "Reporter Name and Title",
          "description": "Your name and professional title",
          "isRequired": true,
          "placeholder": "e.g., John Smith, RN"
        }
      ]
    }
  ]
};


export default function SurveyComponent() {
  const navigate = useNavigate();
  const survey = new Model(surveyJson);

  // Configure survey settings
  survey.showProgressBar = "top";
  survey.progressBarType = "buttons";
  survey.showQuestionNumbers = "off";
  survey.requiredText = "*";
  survey.showCompletedPage = true;
  
  // Add submit logic
  survey.onComplete.add((sender) => {
    console.log("Survey results:", sender.data);
    
    // Here you would typically send the data to your backend
    // For now, we'll simulate a successful submission
    setTimeout(() => {
      alert("Medication incident report submitted successfully!");
      navigate('/incidents');
    }, 2000);
  });

  return (
    <div className="survey-container">
      <Survey model={survey} />
    </div>
  );
}