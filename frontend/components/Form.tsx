"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ChevronRight, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, { message: "Please enter your name" }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .optional(),
  onlineDangers: z
    .string()
    .min(1, { message: "Please share your concerns" })
    .optional(),
  parentalControlExperience: z
    .string()
    .min(1, { message: "Please share your experience" })
    .optional(),
  usefulFeatures: z
    .string()
    .min(1, { message: "Please share your thoughts" })
    .optional(),
  notificationPreference: z
    .enum(["SMS", "Email", "Push Notifications"], {
      required_error: "Please select a notification preference",
    })
    .optional(),
  subscriptionWillingness: z
    .string()
    .min(1, { message: "Please share your thoughts" })
    .optional(),
  recommendationFactors: z
    .string()
    .min(1, { message: "Please share your thoughts" })
    .optional(),
  schoolSupport: z
    .string()
    .min(1, { message: "Please share your thoughts" })
    .optional(),
});

export type FormData = z.infer<typeof formSchema>;

interface TypeformProps {
  onSubmitComplete?: (data: FormData) => void;
}

export default function TypeformComponent({ onSubmitComplete }: TypeformProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const formSteps = [
    {
      field: "name",
      title: "What's your name?",
      description: "We'd love to know what to call you.",
      required: true,
      component: (
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="mb-8">
              <FormControl>
                <Input
                  placeholder="Enter your name (e.g., Alex, Gabi, Caty)"
                  className="text-xl py-6 px-4 border-b-2 rounded-none border-t-0 border-x-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ),
    },
    {
      field: "onlineDangers",
      title: "What online dangers do you consider the most concerning for your child?",
      description: "Please share your thoughts in a few words.",
      required: false,
      component: (
        <FormField
          control={form.control}
          name="onlineDangers"
          render={({ field }) => (
            <FormItem className="mb-8">
              <FormControl>
                <Textarea
                  placeholder="Share your concerns here..."
                  className="text-lg py-4 px-4 min-h-[120px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ),
    },
    {
      field: "parentalControlExperience",
      title: "Have you ever tried a parental control tool? If so, how was your experience?",
      description: "Please share your experience with us.",
      required: false,
      component: (
        <FormField
          control={form.control}
          name="parentalControlExperience"
          render={({ field }) => (
            <FormItem className="mb-8">
              <FormControl>
                <Textarea
                  placeholder="Share your experience here..."
                  className="text-lg py-4 px-4 min-h-[120px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ),
    },
    {
      field: "usefulFeatures",
      title: "What features would you find most useful in an online protection app?",
      description: "Please share your preferences.",
      required: false,
      component: (
        <FormField
          control={form.control}
          name="usefulFeatures"
          render={({ field }) => (
            <FormItem className="mb-8">
              <FormControl>
                <Textarea
                  placeholder="Share the features you'd find most useful..."
                  className="text-lg py-4 px-4 min-h-[120px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ),
    },
    {
      field: "notificationPreference",
      title: "How would you prefer to receive risk notifications?",
      description: "Please select your preferred notification method.",
      required: false,
      component: (
        <FormField
          control={form.control}
          name="notificationPreference"
          render={({ field }) => (
            <FormItem className="mb-8">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col gap-4 sm:flex-row sm:gap-8"
                >
                  <div className="flex items-center space-x-2 rounded-lg border p-4 hover:bg-accent">
                    <RadioGroupItem value="SMS" id="sms" />
                    <FormLabel
                      htmlFor="sms"
                      className="flex-1 cursor-pointer font-normal"
                    >
                      SMS
                    </FormLabel>
                  </div>
                  <div className="flex items-center space-x-2 rounded-lg border p-4 hover:bg-accent">
                    <RadioGroupItem value="Email" id="email-notification" />
                    <FormLabel
                      htmlFor="email-notification"
                      className="flex-1 cursor-pointer font-normal"
                    >
                      Email
                    </FormLabel>
                  </div>
                  <div className="flex items-center space-x-2 rounded-lg border p-4 hover:bg-accent">
                    <RadioGroupItem value="Push Notifications" id="push" />
                    <FormLabel
                      htmlFor="push"
                      className="flex-1 cursor-pointer font-normal"
                    >
                      Push Notifications
                    </FormLabel>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ),
    },
    {
      field: "subscriptionWillingness",
      title: "Would you be willing to pay a subscription for such a service? If so, how much?",
      description: "Please share your thoughts on pricing.",
      required: false,
      component: (
        <FormField
          control={form.control}
          name="subscriptionWillingness"
          render={({ field }) => (
            <FormItem className="mb-8">
              <FormControl>
                <Textarea
                  placeholder="Share your subscription preferences here..."
                  className="text-lg py-4 px-4 min-h-[120px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ),
    },
    {
      field: "recommendationFactors",
      title: "What should such an app include for you to recommend it to other parents?",
      description: "Please share what would make this app worth recommending.",
      required: false,
      component: (
        <FormField
          control={form.control}
          name="recommendationFactors"
          render={({ field }) => (
            <FormItem className="mb-8">
              <FormControl>
                <Textarea
                  placeholder="Share your thoughts here..."
                  className="text-lg py-4 px-4 min-h-[120px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ),
    },
    {
      field: "schoolSupport",
      title: "Do you think it is important for such an app to be supported by schools as well?",
      description: "Please share your opinion on school integration.",
      required: false,
      component: (
        <FormField
          control={form.control}
          name="schoolSupport"
          render={({ field }) => (
            <FormItem className="mb-8">
              <FormControl>
                <Textarea
                  placeholder="Share your thoughts about school support here..."
                  className="text-lg py-4 px-4 min-h-[120px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ),
    },
    {
      field: "email",
      title: "Would you like to stay updated?",
      description:
        "If you would like to stay up to date with the latest information about our online child protection app, please leave us your email address.",
      required: false,
      component: (
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-8">
              <FormControl>
                <Input
                  placeholder="name@example.com"
                  className="text-xl py-6 px-4 border-b-2 rounded-none border-t-0 border-x-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ),
    },
  ];

  function onSubmit(values: FormData) {
    // Get a clean copy of the values before any modifications
    const finalValues = { ...values };
    
    // Remove undefined fields for cleaner data
    Object.keys(finalValues).forEach((key) => {
      const typedKey = key as keyof FormData;
      if (finalValues[typedKey] === undefined) {
        delete finalValues[typedKey];
      }
    });
    
    console.log("Form submitted with values:", finalValues);
    setIsSubmitted(true);

    // If there's a callback function, call it with the form data
    if (onSubmitComplete) {
      onSubmitComplete(finalValues);
    }
  }

  function nextStep() {
    const currentField = formSteps[currentStep].field as keyof FormData;
    const isRequired = formSteps[currentStep].required;

    if (isRequired) {
      form.trigger(currentField).then((isValid) => {
        if (isValid) {
          if (currentStep < formSteps.length - 1) {
            setCurrentStep((prev) => prev + 1);
          } else {
            // On the last step, manually handle submission
            const values = form.getValues();
            onSubmit(values);
          }
        }
      });
    } else {
      if (currentStep < formSteps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        // On the last step with optional field
        const values = form.getValues();
        onSubmit(values);
      }
    }
  }

  function skipStep() {
    const currentField = formSteps[currentStep].field as keyof FormData;

    // Clear the current field's value
    form.setValue(currentField, undefined, { shouldValidate: false });

    // Move to the next step
    if (currentStep < formSteps.length - 1) {
      setCurrentStep((prev) => prev + 1); 
    } else {
      const values = form.getValues();
      onSubmit(values);
    }
  }

  function prevStep() {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }

  const currentStepData = formSteps[currentStep];
  const isOptionalQuestion = !currentStepData.required;

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center bg-background p-6 text-center">
        <div className="mx-auto max-w-md space-y-6">
          <div className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Thank you for your submission!
          </h1>
          <p className="text-muted-foreground">
            We&apos;ve received your information and will be in touch soon.
          </p>
          <Button
            onClick={() => {
              setIsSubmitted(false);
              form.reset({
                name: "",
                email: "",
                onlineDangers: undefined,
                parentalControlExperience: undefined,
                usefulFeatures: undefined,
                notificationPreference: undefined,
                subscriptionWillingness: undefined,
                recommendationFactors: undefined,
                schoolSupport: undefined,
              });
              setCurrentStep(0);
            }}
            className="mt-8"
          >
            Submit another response
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-background">
      {/* Progress bar */}
      <div className="h-1 bg-muted w-full">
        <div
          className="h-full bg-primary transition-all duration-300 ease-in-out"
          style={{ width: `${((currentStep + 1) / formSteps.length) * 100}%` }}
        />
      </div>

      <div className="flex flex-1 items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-xl">
          <Form {...form}>
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2 mb-8">
                <h1 className="text-3xl font-bold tracking-tight">
                  {currentStepData.title}
                </h1>
                <p className="text-muted-foreground">
                  {currentStepData.description}
                  {isOptionalQuestion && currentStepData.field !== "name" && (
                    <span className="ml-1 text-muted-foreground italic">
                      (optional)
                    </span>
                  )}
                </p>
              </div>

              {currentStepData.component}

              <div className="flex justify-between items-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                >
                  Back
                </Button>

                <div className="flex gap-2">
                  {isOptionalQuestion && currentStepData.field !== "name" && (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={skipStep}
                      className="text-muted-foreground"
                    >
                      Skip
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}

                  <Button
                    type="button"
                    onClick={nextStep}
                    className="group bg-primary hover:bg-primary/90 text-white font-medium"
                  >
                    {currentStep === formSteps.length - 1 ? (
                      <>
                        Submit
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="ml-2 transition-transform group-hover:translate-x-1"
                        >
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </>
                    ) : (
                      <>
                        Continue
                        <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}