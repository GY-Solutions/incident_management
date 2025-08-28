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
      "title": "Event Details", 
      "description": "Provide additional details about the medication event",
      "elements": [
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
          "type": "comment",
          "name": "contributing_factors",
          "title": "Contributing Factors",
          "description": "What factors contributed to this event? (e.g., workload, communication, system issues)",
          "rows": 3,
          "placeholder": "Describe factors that may have contributed to this event..."
        }
      ]
    },
    {
      "name": "page3",
      "title": "Review & Submit",
      "description": "Review your information and submit the report",
      "elements": [
        {
          "type": "comment", 
          "name": "immediate_actions",
          "title": "Immediate Actions Taken",
          "description": "What immediate actions were taken after the event was discovered?",
          "rows": 3,
          "placeholder": "Describe any immediate interventions or actions taken..."
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
          "type": "text",
          "name": "reporter_name",
          "title": "Reporter Name and Title",
          "description": "Your name and professional title",
          "isRequired": true,
          "placeholder": "e.g., John Smith, RN"
        }
      ]
    },
  ]
};


export default function SurveyComponent() {
  const navigate = useNavigate();
  const survey = new Model(surveyJson);

  // Configure survey settings
  survey.showProgressBar = "off";
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
    <div className="survey-container" style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <Survey model={survey} />
    </div>
  );
}