"use client"

import TypeformComponent, { FormData } from "@/components/Form"

export default function Home() {
  const handleFormSubmit = async (data: FormData) => {
    console.log("Form submitted with data:", data)
    
    try {
      const response = await fetch('http://localhost:3001/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (result.success) {
        console.log("Form data successfully saved to server:", result.filename);
      } else {
        console.error("Error saving form data:", result.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <TypeformComponent onSubmitComplete={handleFormSubmit} />
    </div>
  )
}