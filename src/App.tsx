import { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle2, Edit2, XCircle, Info, MessageSquare, 
  Activity, Utensils, Moon, Droplets, AlertTriangle, UserCheck, Check, Calendar, ChevronDown,
  FileAudio, BrainCircuit, Cpu
} from 'lucide-react';

const TourTooltip = ({ currentStep, targetStep, title, content, position, onNext, onSkip }: any) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (currentStep === targetStep && tooltipRef.current) {
      // Small delay to allow render and animations
      setTimeout(() => {
        tooltipRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      }, 100);
    }
  }, [currentStep, targetStep]);

  if (currentStep !== targetStep) return null;

  let posClasses = '';
  let arrowSvg = null;

  if (position === 'bottom-left') {
    posClasses = 'top-[calc(100%+24px)] left-0';
    arrowSvg = (
      <svg className="absolute top-[-24px] left-[24px] w-8 h-[24px] text-blue-500 overflow-visible" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <path d="M 16 24 L 16 4" strokeDasharray="4 4" />
        <path d="M 16 4 L 10 10 M 16 4 L 22 10" />
      </svg>
    );
  } else if (position === 'bottom-right') {
    posClasses = 'top-[calc(100%+24px)] right-0';
    arrowSvg = (
      <svg className="absolute top-[-24px] right-[24px] w-8 h-[24px] text-blue-500 overflow-visible" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <path d="M 16 24 L 16 4" strokeDasharray="4 4" />
        <path d="M 16 4 L 10 10 M 16 4 L 22 10" />
      </svg>
    );
  } else if (position === 'top-left') {
    posClasses = 'bottom-[calc(100%+24px)] left-0';
    arrowSvg = (
      <svg className="absolute bottom-[-24px] left-[24px] w-8 h-[24px] text-blue-500 overflow-visible" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <path d="M 16 0 L 16 20" strokeDasharray="4 4" />
        <path d="M 16 20 L 10 14 M 16 20 L 22 14" />
      </svg>
    );
  } else if (position === 'top-right') {
    posClasses = 'bottom-[calc(100%+24px)] right-0';
    arrowSvg = (
      <svg className="absolute bottom-[-24px] right-[24px] w-8 h-[24px] text-blue-500 overflow-visible" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <path d="M 16 0 L 16 20" strokeDasharray="4 4" />
        <path d="M 16 20 L 10 14 M 16 20 L 22 14" />
      </svg>
    );
  }

  return (
    <div ref={tooltipRef} className={`absolute z-[200] w-[350px] bg-white text-slate-800 rounded-2xl p-6 pointer-events-auto shadow-[0_10px_40px_rgba(59,130,246,0.2)] border-2 border-blue-400/50 animate-[slideIn_0.4s_ease-out_forwards] ${posClasses}`}>
       {/* Animated pulsing ring around the tooltip box itself */}
       <div className="absolute inset-0 rounded-2xl ring-4 ring-blue-400/20 animate-[pulse_2s_infinite] pointer-events-none"></div>

       <div className="animate-[pulse_1.5s_infinite]">
         {arrowSvg}
       </div>
       
       <h3 className="font-bold text-lg mb-3 text-slate-800 flex items-center gap-3 relative z-10">
          <div className="p-1.5 bg-blue-50 rounded-lg border border-blue-100">
            <Info className="w-4 h-4 text-blue-600" />
          </div>
          {title}
       </h3>
       
       <div className="text-[14px] text-slate-600 mb-6 leading-relaxed relative z-10 font-medium">
          {content}
       </div>
       
       <div className="flex justify-between items-center pt-4 border-t border-slate-100 relative z-10">
         <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Step {targetStep + 1} of 4</span>
         <div className="flex gap-2">
           <button onClick={onSkip} className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors">Skip Tour</button>
           <button onClick={onNext} className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg text-sm font-bold transition-all shadow-md shadow-blue-500/30">
             {targetStep === 3 ? 'Finish' : 'Next'}
           </button>
         </div>
       </div>
    </div>
  );
};

const ALL_DAYS_TRANSCRIPT = [
  // Day 1
  { id: 1, day: "Day 1", speaker: "Client", time: "08:00 AM", text: "Good morning. Slept only around 5 hours last night. Daughter had exams, so I was awake late." },
  { id: 2, day: "Day 1", speaker: "Client", time: "08:02 AM", text: "Did some mopping, sweeping, Surya Namaskar and walking inside the house." },
  { id: 3, day: "Day 1", speaker: "Client", time: "08:03 AM", text: "Generally feeling happy today." },
  { id: 4, day: "Day 1", speaker: "Coach", time: "08:15 AM", text: "Good. Please keep sharing your daily updates for water, sleep, steps, exercise and meals." },
  { id: 5, day: "Day 1", speaker: "Client", time: "01:30 PM", text: "Had tea and some soaked nuts." },
  { id: 6, day: "Day 1", speaker: "Client", time: "01:32 PM", text: "Lunch was kadhi with soya and green vegetables." },
  { id: 7, day: "Day 1", speaker: "Coach", time: "01:45 PM", text: "Did you have salad before lunch?" },
  { id: 8, day: "Day 1", speaker: "Client", time: "01:50 PM", text: "No. I still need to stock vegetables properly. Will do it tomorrow." },
  { id: 9, day: "Day 1", speaker: "Client", time: "06:00 PM", text: "Feeling some acidity since morning." },
  { id: 10, day: "Day 1", speaker: "Coach", time: "06:10 PM", text: "Did it start after eating something?" },
  { id: 11, day: "Day 1", speaker: "Client", time: "06:15 PM", text: "No. Slept very late and did a lot of work today. Got up with acidity." },
  { id: 12, day: "Day 1", speaker: "Coach", time: "06:30 PM", text: "Did you walk after meals?" },
  { id: 13, day: "Day 1", speaker: "Client", time: "06:35 PM", text: "Yes, around 15 minutes." },
  
  // Day 2
  { id: 101, day: "Day 2", speaker: "Client", time: "09:00 AM", text: "Walk and water done." },
  { id: 102, day: "Day 2", speaker: "Client", time: "09:05 AM", text: "Can I have banana stem, mint and ginger juice?" },
  { id: 103, day: "Day 2", speaker: "Coach", time: "09:10 AM", text: "Yes." },
  { id: 104, day: "Day 2", speaker: "Client", time: "01:00 PM", text: "Tea 1 cup and 1 apple." },
  { id: 105, day: "Day 2", speaker: "Client", time: "07:30 PM", text: "Didn’t eat much in the evening. Just a small piece of paneer." },
  { id: 106, day: "Day 2", speaker: "Client", time: "07:32 PM", text: "Still having acidity and bloating." },
  { id: 107, day: "Day 2", speaker: "Coach", time: "08:00 PM", text: "Please don’t skip meals completely. Try to keep the meals simple." },

  // Day 3
  { id: 108, day: "Day 3", speaker: "Client", time: "08:00 AM", text: "I had to go to school after a few days. Very hectic morning." },
  { id: 109, day: "Day 3", speaker: "Client", time: "08:05 AM", text: "Coconut water, tea, prunes and some seeds till now." },
  { id: 110, day: "Day 3", speaker: "Coach", time: "08:30 AM", text: "Nothing else till now?" },
  { id: 111, day: "Day 3", speaker: "Client", time: "08:35 AM", text: "No. I didn’t get time." },
  { id: 112, day: "Day 3", speaker: "Coach", time: "08:45 AM", text: "Slowly we need to adjust the routine around your school schedule also." },
  { id: 113, day: "Day 3", speaker: "Client", time: "08:50 AM", text: "Yes. I know it will take time." },
  { id: 114, day: "Day 3", speaker: "Client", time: "01:30 PM", text: "Lunch had lots of vegetables, curd and some protein." },
  { id: 115, day: "Day 3", speaker: "Client", time: "01:35 PM", text: "Forgot ACV today. Not yet in the habit." },
  { id: 116, day: "Day 3", speaker: "Coach", time: "02:00 PM", text: "Set a reminder around meal timings." },
  { id: 117, day: "Day 3", speaker: "Client", time: "02:05 PM", text: "Yes, will do." },
  { id: 118, day: "Day 3", speaker: "Coach", time: "08:00 PM", text: "[Accountability] Today’s update: Water 4 litres, Sleep 5 hours, Steps around 8,000, Exercise only walking." },

  // Day 4
  { id: 119, day: "Day 4", speaker: "Client", time: "09:00 AM", text: "Breakfast was 1.5 vegetable chapatis with seeds and ajwain." },
  { id: 120, day: "Day 4", speaker: "Client", time: "09:05 AM", text: "One cup tea." },
  { id: 121, day: "Day 4", speaker: "Client", time: "11:00 AM", text: "4,500 steps so far." },
  { id: 122, day: "Day 4", speaker: "Coach", time: "12:00 PM", text: "Did you carry lunch to school?" },
  { id: 123, day: "Day 4", speaker: "Client", time: "12:15 PM", text: "Yes." },
  { id: 124, day: "Day 4", speaker: "Client", time: "01:00 PM", text: "ACV done today." },
  { id: 125, day: "Day 4", speaker: "Client", time: "01:30 PM", text: "Lunch done. Trying to eat slowly." },
  { id: 126, day: "Day 4", speaker: "Coach", time: "01:45 PM", text: "Good. Chew properly and avoid rushing meals." },
  { id: 127, day: "Day 4", speaker: "Client", time: "06:00 PM", text: "Did around 20 minutes walking, stretching and breathing today. Feeling really good." },

  // Day 5
  { id: 128, day: "Day 5", speaker: "Client", time: "08:00 AM", text: "Weight seems slightly up even though I’m eating almost half of what I used to eat." },
  { id: 129, day: "Day 5", speaker: "Coach", time: "08:30 AM", text: "It is not always about eating less. Your body needs adequate nutrition." },
  { id: 130, day: "Day 5", speaker: "Coach", time: "08:31 AM", text: "Protein seems low in breakfast on some days." },
  { id: 131, day: "Day 5", speaker: "Client", time: "08:45 AM", text: "I didn’t have sprouts today. Have ordered them." },
  { id: 132, day: "Day 5", speaker: "Coach", time: "09:00 AM", text: "You can also have boiled chana, moong or chhole." },
  { id: 133, day: "Day 5", speaker: "Client", time: "02:00 PM", text: "Forgot to mention, I had roasted chana at school." },
  { id: 134, day: "Day 5", speaker: "Client", time: "06:00 PM", text: "Did 20 minutes stretching and running." },

  // Day 6
  { id: 135, day: "Day 6", speaker: "Client", time: "09:00 AM", text: "Yesterday energy was very good. Today feeling low again." },
  { id: 136, day: "Day 6", speaker: "Client", time: "09:05 AM", text: "Bloating is back and I feel like I have gained weight." },
  { id: 137, day: "Day 6", speaker: "Coach", time: "09:30 AM", text: "Food intake was low today. Protein was also missing." },
  { id: 138, day: "Day 6", speaker: "Client", time: "09:45 AM", text: "I had roasted chana and kala chana." },
  { id: 139, day: "Day 6", speaker: "Client", time: "09:50 AM", text: "I am not getting enough time to plan meals. Next week should be easier." },
  { id: 140, day: "Day 6", speaker: "Coach", time: "10:00 AM", text: "That could be one of the main barriers right now. Let’s keep the plan practical." },

  // Day 7
  { id: 201, day: "Day 7", speaker: "Client", time: "09:00 AM", text: "Steps 6,000 today." },
  { id: 202, day: "Day 7", speaker: "Client", time: "09:05 AM", text: "Sleep around 5.5 hours." },
  { id: 203, day: "Day 7", speaker: "Client", time: "09:10 AM", text: "Did mopping and sweeping also, lots of movement." },
  { id: 204, day: "Day 7", speaker: "Client", time: "01:30 PM", text: "Breakfast and lunch were okay." },
  { id: 205, day: "Day 7", speaker: "Coach", time: "03:00 PM", text: "[Accountability] Tried calling you. Please update when free." },
  { id: 206, day: "Day 7", speaker: "Client", time: "04:00 PM", text: "Sorry I missed your call. There was a stressful situation at work." },
  { id: 207, day: "Day 7", speaker: "Client", time: "04:05 PM", text: "Had a very hectic day today." },
  { id: 208, day: "Day 7", speaker: "Client", time: "04:10 PM", text: "There is a lot of office pressure and politics going on." },
  { id: 209, day: "Day 7", speaker: "Client", time: "04:15 PM", text: "During a meeting today I was so tired that my head went down on the table and I actually slept for a few seconds." },
  { id: 210, day: "Day 7", speaker: "Client", time: "04:20 PM", text: "Feeling very low." },
  { id: 211, day: "Day 7", speaker: "Client", time: "04:25 PM", text: "I feel I can sleep for days." },
  { id: 212, day: "Day 7", speaker: "Coach", time: "05:00 PM", text: "That sounds like a very exhausting day. Please rest today. We also need to look at your sleep and stress more carefully." },

  // Day 8
  { id: 213, day: "Day 8", speaker: "Client", time: "09:00 AM", text: "Slept better last night, around 8 hours." },
  { id: 214, day: "Day 8", speaker: "Client", time: "09:05 AM", text: "Energy feels much better today." },
  { id: 215, day: "Day 8", speaker: "Client", time: "09:10 AM", text: "Water around 3.5 litres." },
  { id: 216, day: "Day 8", speaker: "Client", time: "09:15 AM", text: "Did 30 minutes exercise." },
  { id: 217, day: "Day 8", speaker: "Client", time: "09:20 AM", text: "Steps around 8,000." },
  { id: 218, day: "Day 8", speaker: "Client", time: "09:25 AM", text: "Weight is around 83 kg. Waist almost same." },
  { id: 219, day: "Day 8", speaker: "Client", time: "09:30 AM", text: "Still having bloating on and off." },
  { id: 220, day: "Day 8", speaker: "Client", time: "09:35 AM", text: "But overall energy is much better than before." },
  { id: 221, day: "Day 8", speaker: "Coach", time: "10:00 AM", text: "That is good progress. Let’s continue tracking sleep, bloating, meals and movement consistently." }
];

const intelligenceData = {
  "Day 1": {
    ai_reasoning: {
      value: "Sentiment analysis of the text ('Generally feeling happy today') coupled with their proactive morning updates indicates strong initial motivation. Despite only 5 hours of sleep and reporting acidity, their engagement remains high. Capitalize on this momentum to establish daily tracking habits.",
      confidence: "AI-Inferred"
    },
    weekly_summary: {
      value: "The client started the day feeling generally happy and completed household chores, but experienced acidity and only got 5 hours of sleep due to staying up late for their daughter's exams.",
      supporting_evidence: "Slept only around 5 hours last night... Generally feeling happy today... Got up with acidity.",
      confidence: "AI-Inferred"
    },
    metrics: {
      nutrition_adherence: { value: "Had tea, soaked nuts, and kadhi with soya and green vegetables. Skipped salad due to lack of groceries.", supporting_evidence: "Lunch was kadhi... No. I still need to stock vegetables.", confidence: "Client-Reported" },
      exercise_and_steps: { value: "Household chores, walking 15-minute post-meal walk.", supporting_evidence: "mopping, sweeping, Surya Namaskar... Yes, around 15 minutes", confidence: "Client-Reported" },
      sleep: { value: "5 hours of sleep.", supporting_evidence: "Slept only around 5 hours last night.", confidence: "Client-Reported" },
      water_intake: { value: null, supporting_evidence: null, confidence: "Missing" }
    },
    health_and_wellbeing: {
      symptoms_and_stress: { value: "Woke up with acidity after sleeping late and doing a lot of work.", supporting_evidence: "Got up with acidity.", confidence: "Client-Reported" },
      engagement_level: { value: "High", supporting_evidence: "Detailed logs provided without prompting.", confidence: "AI-Inferred" }
    },
    actionable_insights: {
      key_barriers: [{ value: "Lack of proper groceries (vegetables)", supporting_evidence: "I still need to stock vegetables properly.", confidence: "Client-Reported" }],
      pending_actions: [{ value: "Stock vegetables properly to prepare salads.", supporting_evidence: "Will do it tomorrow.", confidence: "Client-Reported" }],
      recommended_next_action: { value: "Check in regarding acidity and whether groceries were stocked.", supporting_evidence: "Got up with acidity... Will do it tomorrow.", confidence: "AI-Inferred" },
      risk_attention_flags: [{ issue_description: "5 hours sleep and acidity.", priority: "Medium", supporting_evidence: "Slept only around 5 hours last night", confidence: "AI-Inferred" }]
    }
  },
  "Day 2": {
    ai_reasoning: {
      value: "Textual analysis reveals a concerning pattern: the client skipped major meals (eating only an apple and paneer) and is reporting continued acidity and bloating. The brevity of their evening messages compared to Day 1 indicates a drop in energy and engagement. They are highly vulnerable to crashing tomorrow.",
      confidence: "AI-Inferred"
    },
    weekly_summary: {
      value: "Client completed basic water goals but ate extremely little, resulting in continued acidity and bloating.",
      supporting_evidence: "Didn’t eat much in the evening... Still having acidity and bloating.",
      confidence: "AI-Inferred"
    },
    metrics: {
      nutrition_adherence: { value: "Skipped meals. Ate 1 cup tea, 1 apple and small paneer.", supporting_evidence: "Didn’t eat much in the evening.", confidence: "Client-Reported" },
      exercise_and_steps: { value: "Completed daily walk.", supporting_evidence: "Walk and water done.", confidence: "Client-Reported" },
      sleep: { value: null, supporting_evidence: null, confidence: "Missing" },
      water_intake: { value: "Completed daily water goals.", supporting_evidence: "Walk and water done.", confidence: "Client-Reported" }
    },
    health_and_wellbeing: {
      symptoms_and_stress: { value: "Still experiencing acidity and bloating.", supporting_evidence: "Still having acidity and bloating.", confidence: "Client-Reported" },
      engagement_level: { value: "Medium", supporting_evidence: "Brief updates provided.", confidence: "AI-Inferred" }
    },
    actionable_insights: {
      key_barriers: [{ value: "Drastically undereating and skipping meals.", supporting_evidence: "Didn’t eat much.", confidence: "AI-Inferred" }],
      pending_actions: [],
      recommended_next_action: { value: "Work to establish simple meal structure.", supporting_evidence: "Please don’t skip meals completely.", confidence: "AI-Inferred" },
      risk_attention_flags: [{ issue_description: "Severe calorie restriction causing bloating.", priority: "High", supporting_evidence: "Didn’t eat much... Still having acidity", confidence: "AI-Inferred" }]
    }
  },
  "Day 3": {
    ai_reasoning: { value: "The timestamp data and delayed responses indicate the client is struggling to adapt to their new school schedule. The semantic shift towards 'hectic' and 'didn't get time' confirms that morning time constraints are their primary barrier right now. They need immediate help establishing a 5-minute meal-prep routine.", confidence: "AI-Inferred" },
    weekly_summary: { value: "Client struggled to adapt to a hectic school morning, skipping meals initially but managing a balanced lunch later.", supporting_evidence: "I didn’t get time... Lunch had lots of vegetables", confidence: "AI-Inferred" },
    metrics: {
      nutrition_adherence: { value: "Skipped early meals. Had a good lunch. Forgot ACV.", supporting_evidence: "Coconut water, tea, prunes... Forgot ACV today.", confidence: "Client-Reported" },
      exercise_and_steps: { value: "8,000 steps and walking.", supporting_evidence: "Steps around 8,000, Exercise only walking.", confidence: "Client-Reported" },
      sleep: { value: "5 hours.", supporting_evidence: "Sleep 5 hours", confidence: "Client-Reported" },
      water_intake: { value: "4 litres.", supporting_evidence: "Water 4 litres", confidence: "Client-Reported" }
    },
    health_and_wellbeing: {
      symptoms_and_stress: { value: "Hectic routine causing stress.", supporting_evidence: "Very hectic morning.", confidence: "Client-Reported" },
      engagement_level: { value: "High", supporting_evidence: "Provided full update by end of day.", confidence: "AI-Inferred" }
    },
    actionable_insights: { 
      key_barriers: [{ value: "School schedule preventing morning meals.", supporting_evidence: "I didn’t get time.", confidence: "Client-Reported" }], 
      pending_actions: [{ value: "Set ACV and meal reminders.", supporting_evidence: "Set a reminder around meal timings.", confidence: "AI-Inferred" }], 
      recommended_next_action: { value: "Help client adjust meal planning around school hours.", confidence: "AI-Inferred" }, 
      risk_attention_flags: [{ issue_description: "5 hours of sleep combined with hectic mornings.", priority: "Medium", supporting_evidence: "Sleep 5 hours", confidence: "AI-Inferred" }] 
    }
  },
  "Day 4": {
    ai_reasoning: { value: "The client's language ('Feeling really good') and structured updates reflect a major behavioral win today. Successfully carrying lunch to school and integrating ACV demonstrates that the coach's practical adjustments are working. This is a crucial moment for positive reinforcement.", confidence: "AI-Inferred" },
    weekly_summary: { value: "Strong day where the client successfully carried lunch to school, ate slowly, and exercised. Feeling really good.", supporting_evidence: "Lunch done. Trying to eat slowly... Feeling really good.", confidence: "AI-Inferred" },
    metrics: {
      nutrition_adherence: { value: "Carried lunch, did ACV, and had chapati.", supporting_evidence: "Breakfast was 1.5 vegetable chapatis... ACV done today.", confidence: "Client-Reported" },
      exercise_and_steps: { value: "4,500 steps early on + 20 mins walking/stretching.", supporting_evidence: "Did around 20 minutes walking, stretching", confidence: "Client-Reported" },
      sleep: { value: null, confidence: "Missing" },
      water_intake: { value: null, confidence: "Missing" }
    },
    health_and_wellbeing: { symptoms_and_stress: { value: "Feeling really good.", supporting_evidence: "Feeling really good.", confidence: "Client-Reported" }, engagement_level: { value: "High", confidence: "AI-Inferred" } },
    actionable_insights: { key_barriers: [], pending_actions: [], recommended_next_action: { value: "Acknowledge the win and habit of carrying lunch.", confidence: "AI-Inferred" }, risk_attention_flags: [] }
  },
  "Day 5": {
    ai_reasoning: { value: "Sentiment analysis flags significant frustration regarding their weight ('eating almost half of what I used to'). The client is falling into the trap of severe calorie restriction, which is ironically causing the bloating they complained about. Immediate coaching intervention is needed to educate them on adequate nutrition.", confidence: "AI-Inferred" },
    weekly_summary: { value: "Client is eating less but feels weight is up, indicating possible protein deficiency.", supporting_evidence: "Weight seems slightly up even though I’m eating almost half", confidence: "AI-Inferred" },
    metrics: { nutrition_adherence: { value: "Low protein, missing sprouts. Supplemented with roasted chana.", supporting_evidence: "I didn’t have sprouts today... I had roasted chana", confidence: "Client-Reported" }, exercise_and_steps: { value: "20 mins stretching/running", supporting_evidence: "Did 20 minutes stretching and running.", confidence: "Client-Reported" }, sleep: { value: null, confidence: "Missing" }, water_intake: { value: null, confidence: "Missing" } },
    health_and_wellbeing: { symptoms_and_stress: { value: "Frustrated about weight vs food intake.", supporting_evidence: "Weight seems slightly up", confidence: "Client-Reported" }, engagement_level: { value: "Medium", confidence: "AI-Inferred" } },
    actionable_insights: { key_barriers: [{ value: "Not ordering/preparing protein (sprouts) ahead of time.", supporting_evidence: "I didn’t have sprouts today. Have ordered them.", confidence: "Client-Reported" }], pending_actions: [], recommended_next_action: { value: "Educate on adequate nutrition vs starving.", confidence: "AI-Inferred" }, risk_attention_flags: [{ issue_description: "Restricting calories significantly instead of balancing macros.", priority: "Medium", supporting_evidence: "eating almost half of what I used to eat.", confidence: "AI-Inferred" }] }
  },
  "Day 6": {
    ai_reasoning: { value: "The client's language reveals a complete physical and emotional crash ('Today feeling low again', 'Bloating is back'). This correlates directly with the lack of protein and poor meal planning over the last 48 hours. They are feeling overwhelmed and need extreme empathy and a simplified plan for next week.", confidence: "AI-Inferred" },
    weekly_summary: { value: "Client's energy crashed and bloating returned due to poor meal planning and low protein intake.", supporting_evidence: "Today feeling low again... Bloating is back", confidence: "AI-Inferred" },
    metrics: { nutrition_adherence: { value: "Food intake low. Protein missing.", supporting_evidence: "Food intake was low today. Protein was also missing.", confidence: "AI-Inferred" }, exercise_and_steps: { value: null, confidence: "Missing" }, sleep: { value: null, confidence: "Missing" }, water_intake: { value: null, confidence: "Missing" } },
    health_and_wellbeing: { symptoms_and_stress: { value: "Low energy, bloating, feeling of weight gain.", supporting_evidence: "Today feeling low again... Bloating is back", confidence: "Client-Reported" }, engagement_level: { value: "Medium", confidence: "AI-Inferred" } },
    actionable_insights: { key_barriers: [{ value: "No time to plan meals.", supporting_evidence: "I am not getting enough time to plan meals.", confidence: "Client-Reported" }], pending_actions: [], recommended_next_action: { value: "Keep meal plans extremely practical for the upcoming week.", confidence: "AI-Inferred" }, risk_attention_flags: [{ issue_description: "Consistent low protein and poor planning leading to bloating.", priority: "High", supporting_evidence: "Protein was also missing.", confidence: "AI-Inferred" }] }
  },
  "Day 7": {
    ai_reasoning: { value: "Textual risk flags are at their highest. The combination of severe office politics, missed coach calls, and consecutive nights of poor sleep (5.5 hrs) has caused total burnout, culminating in them falling asleep at work. Prioritize stress management and immediate rest over diet tracking today.", confidence: "AI-Inferred" },
    weekly_summary: { value: "Severe mid-week crash due to extreme office politics, poor sleep (5.5 hrs), leading to the client falling asleep in a meeting.", supporting_evidence: "my head went down on the table and I actually slept for a few seconds.", confidence: "AI-Inferred" },
    metrics: { nutrition_adherence: { value: "Breakfast and lunch okay.", supporting_evidence: "Breakfast and lunch were okay.", confidence: "Client-Reported" }, exercise_and_steps: { value: "6,000 steps + mopping.", supporting_evidence: "Steps 6,000 today... Did mopping and sweeping", confidence: "Client-Reported" }, sleep: { value: "5.5 hours.", supporting_evidence: "Sleep around 5.5 hours.", confidence: "Client-Reported" }, water_intake: { value: null, confidence: "Missing" } },
    health_and_wellbeing: { symptoms_and_stress: { value: "Office pressure, politics, extreme fatigue, feeling very low.", supporting_evidence: "tired that my head went down on the table... I feel I can sleep for days.", confidence: "Client-Reported" }, engagement_level: { value: "High", confidence: "AI-Inferred" } },
    actionable_insights: { key_barriers: [{ value: "Extreme workplace stress and poor sleep.", supporting_evidence: "office pressure and politics going on.", confidence: "Client-Reported" }], pending_actions: [], recommended_next_action: { value: "Address sleep and stress management urgently.", confidence: "AI-Inferred" }, risk_attention_flags: [{ issue_description: "Falling asleep during work meetings due to exhaustion.", priority: "High", supporting_evidence: "I actually slept for a few seconds.", confidence: "Client-Reported" }] }
  },
  "Day 8": {
    ai_reasoning: { value: "Longitudinal text analysis shows a stark contrast in the client's mood and engagement after securing 8 hours of sleep. The language shift from 'exhausted' to 'overall energy is much better' proves that sleep is the primary driver of their recovery. This is the perfect moment to emphasize how crucial sleep is to their progress.", confidence: "AI-Inferred" },
    weekly_summary: { value: "Client bounced back massively with 8 hours of sleep, 3.5L water, and exercise. Energy is much better.", supporting_evidence: "Slept better last night, around 8 hours. Energy feels much better", confidence: "AI-Inferred" },
    metrics: { nutrition_adherence: { value: null, confidence: "Missing" }, exercise_and_steps: { value: "30 min exercise, 8,000 steps.", supporting_evidence: "Did 30 minutes exercise... Steps around 8,000.", confidence: "Client-Reported" }, sleep: { value: "8 hours.", supporting_evidence: "around 8 hours.", confidence: "Client-Reported" }, water_intake: { value: "3.5L", supporting_evidence: "Water around 3.5 litres.", confidence: "Client-Reported" } },
    health_and_wellbeing: { symptoms_and_stress: { value: "Energy improved. Still bloating on and off.", supporting_evidence: "Still having bloating on and off.", confidence: "Client-Reported" }, engagement_level: { value: "High", confidence: "AI-Inferred" } },
    actionable_insights: { key_barriers: [], pending_actions: [], recommended_next_action: { value: "Praise consistency and emphasize the impact of 8 hours of sleep.", confidence: "AI-Inferred" }, risk_attention_flags: [] }
  },
  "All Days": {
    ai_reasoning: {
      value: "Cross-referencing 8 days of text updates with reported metrics reveals a clear pattern: The client's dietary adherence and emotional resilience crash completely when they get less than 6 hours of sleep (Days 1, 3, 7). Conversely, when they sleep 7+ hours (Days 4, 8), their engagement is high and they easily stick to their diet. Sleep is the primary domino for this client's success.",
      confidence: "AI-Inferred"
    },
    weekly_summary: {
      value: "Over the week, the client struggled with sleep, acidity, and skipping meals due to a hectic schedule and stress. However, by Day 8, sleep improved to 8 hours and energy significantly increased.",
      supporting_evidence: "so tired that my head went down... Slept better last night, around 8 hours.",
      confidence: "AI-Inferred"
    },
    metrics: {
      nutrition_adherence: { value: "Highly inconsistent. Often skipped meals or lacked protein due to poor planning.", supporting_evidence: "I am not getting enough time to plan meals... Protein was also missing.", confidence: "AI-Inferred" },
      exercise_and_steps: { value: "Consistent. Averaged 4,500 to 8,000 steps daily.", supporting_evidence: "Steps 6,000 today... Steps around 8,000.", confidence: "Confirmed Fact" },
      sleep: { value: "Started poor (5-5.5 hours) due to stress, but recovered to 8 hours by the end of the week.", supporting_evidence: "Sleep around 5.5 hours... Slept better last night, around 8 hours.", confidence: "Client-Reported" },
      water_intake: { value: "Generally hitting 3.5 to 4 litres when reported.", supporting_evidence: "Water 4 litres... Water around 3.5 litres.", confidence: "Client-Reported" }
    },
    health_and_wellbeing: {
      symptoms_and_stress: { value: "Persistent acidity and bloating early in the week. Extreme fatigue mid-week. Improved energy by Day 8.", supporting_evidence: "my head went down on the table... Energy feels much better today.", confidence: "Client-Reported" },
      engagement_level: { value: "High", supporting_evidence: "The client logged updates consistently across all 8 days despite severe work stress.", confidence: "AI-Inferred" }
    },
    actionable_insights: {
      key_barriers: [
        { value: "Lack of meal planning time and hectic school schedule.", supporting_evidence: "I am not getting enough time to plan meals.", confidence: "Client-Reported" },
        { value: "High stress and office politics draining energy.", supporting_evidence: "There is a lot of office pressure and politics going on.", confidence: "Client-Reported" }
      ],
      pending_actions: [{ value: "Client needs to maintain ACV habits.", supporting_evidence: "Forgot ACV today.", confidence: "Client-Reported" }],
      recommended_next_action: { value: "Focus on sleep hygiene and practical, quick meal prep to stabilize energy and digestion. Praise them for the consistency.", supporting_evidence: "Let’s keep the plan practical.", confidence: "AI-Inferred" },
      risk_attention_flags: [{ issue_description: "Mid-week crash due to exhaustion, leading to falling asleep at work.", priority: "High", supporting_evidence: "my head went down on the table and I actually slept for a few seconds.", confidence: "Confirmed Fact" }]
    }
  }
};

const CUSTOM_UPLOAD_TRANSCRIPT = [
  { id: 901, day: "Custom Upload", speaker: "Client", time: "00:01", text: "Hey, just sending in my weekly voice note. I've been really trying to keep up with the water intake, hitting about 3 liters every day." },
  { id: 902, day: "Custom Upload", speaker: "Client", time: "00:15", text: "But honestly, my sleep has been terrible. I keep waking up around 3 AM and can't go back to sleep. I think work stress is getting to me." },
  { id: 903, day: "Custom Upload", speaker: "Client", time: "00:30", text: "I did manage to prep my meals on Sunday though, so I haven't ordered takeout all week, which is a big win for me." },
  { id: 904, day: "Custom Upload", speaker: "System", time: "00:45", text: "[End of Audio Recording]" }
];

const CUSTOM_UPLOAD_DATA = {
  ai_reasoning: {
    value: "NLP analysis of the transcription reveals severe stress specifically regarding sleep patterns. The client is experiencing severe work-induced insomnia (waking at 3 AM). If this continues, their cortisol levels will spike, severely hindering their metabolic progress.",
    confidence: "AI-Inferred"
  },
  weekly_summary: {
    value: "Client had a successful week with meal prep and hydration, but is experiencing severe sleep disturbances likely tied to work-related anxiety.",
    supporting_evidence: "haven't ordered takeout all week... waking up around 3 AM",
    confidence: "AI-Inferred"
  },
  metrics: {
    nutrition_adherence: { value: "Excellent. Successfully meal-prepped and avoided takeout.", supporting_evidence: "prep my meals on Sunday... haven't ordered takeout", confidence: "Client-Reported" },
    exercise_and_steps: { value: null, confidence: "Missing" },
    sleep: { value: "Severely disrupted. Waking at 3 AM.", supporting_evidence: "sleep has been terrible. I keep waking up around 3 AM", confidence: "Client-Reported" },
    water_intake: { value: "3 Liters daily.", supporting_evidence: "hitting about 3 liters every day.", confidence: "Client-Reported" }
  },
  health_and_wellbeing: {
    symptoms_and_stress: { value: "High work stress leading to insomnia.", supporting_evidence: "I think work stress is getting to me.", confidence: "Client-Reported" },
    engagement_level: { value: "High", supporting_evidence: "Proactively sent a voice note update.", confidence: "AI-Inferred" }
  },
  actionable_insights: {
    key_barriers: [{ value: "Work stress causing middle-of-the-night insomnia.", supporting_evidence: "waking up around 3 AM and can't go back to sleep.", confidence: "Client-Reported" }],
    pending_actions: [],
    recommended_next_action: { value: "Introduce a wind-down routine and discuss stress management tactics.", confidence: "AI-Inferred" },
    risk_attention_flags: [{ issue_description: "Chronic 3 AM awakenings will severely impact metabolism and energy if not addressed.", priority: "High", supporting_evidence: "sleep has been terrible", confidence: "AI-Inferred" }]
  }
};

const ConfidenceBadge = ({ confidence }: { confidence: string }) => {
  const styles: Record<string, string> = {
    "Confirmed Fact": "bg-green-100 text-green-800 border-green-200",
    "Client-Reported": "bg-yellow-100 text-yellow-800 border-yellow-200",
    "AI-Inferred": "bg-purple-100 text-purple-800 border-purple-200",
    "Missing": "bg-gray-100 text-gray-500 border-gray-200"
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border shadow-sm ${styles[confidence] || styles["Missing"]}`}>
      {confidence}
    </span>
  );
};

const InsightCard = ({ title, icon: Icon, dataObj, specialStyle = false, tourStep, setTourStep }: any) => {
  const [status, setStatus] = useState<"idle" | "approved" | "rejected" | "editing">("idle");
  const [editValue, setEditValue] = useState(dataObj?.value || "");

  if (!dataObj) return null;
  
  const cardOpacity = status === "rejected" ? "opacity-50 grayscale" : "opacity-100";
  let bgClasses = specialStyle ? "bg-purple-50/50 border-purple-200 shadow-purple-100" : "bg-white border-slate-200";
  if (status === "approved") bgClasses = "bg-green-50/50 border-green-300";

  return (
    <div className={`${bgClasses} border rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 mb-4 group relative ${cardOpacity}`}>
      {status === "idle" && !specialStyle && (
        <div className={`absolute top-0 left-0 w-full h-1 rounded-t-xl ${
          dataObj.confidence === 'Confirmed Fact' ? 'bg-green-400' :
          dataObj.confidence === 'Client-Reported' ? 'bg-yellow-400' :
          dataObj.confidence === 'AI-Inferred' ? 'bg-purple-400' : 'bg-gray-300'
        }`} />
      )}
      {status === "idle" && specialStyle && <div className="absolute top-0 left-0 w-full h-1 bg-purple-500 rounded-t-xl" />}
      {status === "approved" && <div className="absolute top-0 left-0 w-full h-1 bg-green-500 rounded-t-xl" />}
      
      <div className="flex items-start justify-between mb-3 mt-1">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg border ${
             status === "approved" ? "bg-green-100 border-green-200 text-green-600" : 
             specialStyle ? "bg-purple-100 border-purple-200 text-purple-600" :
             "bg-slate-50 border-slate-100 text-slate-500"
          }`}>
            {status === "approved" ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
          </div>
          <h3 className={`font-semibold ${
             status === "approved" ? "text-green-800" : 
             specialStyle ? "text-purple-900" : "text-slate-800"
          }`}>{title}</h3>
        </div>
        <div className={`flex items-center gap-2 relative p-1.5 rounded-lg transition-all duration-300 ${tourStep === 2 && title === 'Synthesized Reasoning' ? 'z-[150] bg-white shadow-lg' : ''}`}>
           {tourStep === 2 && title === 'Synthesized Reasoning' && <div className="absolute inset-0 ring-4 ring-blue-500/60 rounded-lg animate-pulse pointer-events-none" />}
           {title === 'Synthesized Reasoning' && (
             <TourTooltip 
                currentStep={tourStep} targetStep={2} 
                title="3. Hallucination Control System" 
                content={(
                  <>
                    <p className="mb-3">Every piece of data is color-coded by the AI so the coach instantly knows its source:</p>
                    <div className="space-y-2 text-xs">
                       <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-green-400"></span> <strong className="text-slate-800">Confirmed Fact:</strong> Verified by devices.</div>
                       <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span> <strong className="text-slate-800">Client-Reported:</strong> Prone to bias.</div>
                       <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span> <strong className="text-slate-800">AI-Inferred:</strong> Predicted by the LLM.</div>
                    </div>
                  </>
                )}
                position="bottom-right" 
                onNext={() => setTourStep && setTourStep(3)} onSkip={() => setTourStep && setTourStep(-1)} 
             />
           )}
           {status === "approved" && <span className="text-xs font-bold text-green-600 uppercase tracking-wider">Approved</span>}
           {status === "rejected" && <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Rejected</span>}
           <ConfidenceBadge confidence={dataObj.confidence} />
        </div>
      </div>
      
      <div className="mt-4 space-y-4">
        {status === "editing" ? (
          <textarea 
            value={editValue} 
            onChange={(e) => setEditValue(e.target.value)} 
            className="w-full text-sm text-slate-700 bg-white border border-blue-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px] shadow-inner"
            placeholder="Edit AI insight here..."
          />
        ) : (
          <p className={`text-sm leading-relaxed ${specialStyle && status === "idle" ? "text-purple-900" : "text-slate-700"}`}>
            {editValue || <span className="italic text-slate-400">No data extracted for this period.</span>}
          </p>
        )}
        
        {dataObj.supporting_evidence && status !== "rejected" && (
          <div className={`${specialStyle ? "bg-purple-100/50 border-purple-200" : "bg-slate-50 border-slate-300"} border-l-4 p-3 rounded-r-lg`}>
            <p className={`text-[11px] font-bold mb-1 uppercase tracking-wider flex items-center gap-1 ${specialStyle ? "text-purple-600" : "text-slate-500"}`}>
              <MessageSquare className="w-3 h-3" /> Supporting Context
            </p>
            <p className={`text-sm italic ${specialStyle ? "text-purple-800" : "text-slate-600"}`}>"{dataObj.supporting_evidence}"</p>
          </div>
        )}
        
        {dataObj.value && status === "idle" && (
          <div className={`flex items-center gap-2 pt-4 mt-2 border-t opacity-100 transition-all relative p-2 rounded-lg ${specialStyle ? "border-purple-100" : "border-slate-100"} ${tourStep === 3 && title === 'Synthesized Reasoning' ? 'z-[150] bg-white shadow-lg' : ''}`}>
            {tourStep === 3 && title === 'Synthesized Reasoning' && <div className="absolute inset-0 ring-4 ring-blue-500/60 rounded-lg animate-pulse pointer-events-none" />}
            {title === 'Synthesized Reasoning' && (
             <TourTooltip 
                currentStep={tourStep} targetStep={3} 
                title="4. Human-in-the-Loop Feedback" 
                content="AI is never 100% perfect. Coaches can click 'Edit', 'Approve', or 'Reject' on any insight card to correct the profile and train the AI system."
                position="top-left" 
                onNext={() => setTourStep && setTourStep(-1)} onSkip={() => setTourStep && setTourStep(-1)} 
             />
            )}
            <button onClick={() => setStatus("approved")} className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 border border-green-100 hover:bg-green-100 rounded-md text-xs font-semibold transition-colors">
              <CheckCircle2 className="w-3.5 h-3.5" /> Approve
            </button>
            <button onClick={() => setStatus("editing")} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100 rounded-md text-xs font-semibold transition-colors">
              <Edit2 className="w-3.5 h-3.5" /> Edit
            </button>
            <button onClick={() => setStatus("rejected")} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 border border-red-100 hover:bg-red-100 rounded-md text-xs font-semibold transition-colors">
              <XCircle className="w-3.5 h-3.5" /> Reject
            </button>
          </div>
        )}

        {status === "editing" && (
          <div className="flex items-center gap-2 pt-4 mt-2 border-t border-slate-100 justify-between">
             <button onClick={() => setStatus("idle")} className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 text-white hover:bg-blue-700 rounded-md text-xs font-bold transition-colors shadow-sm">
               <Check className="w-3.5 h-3.5" /> Save Changes
             </button>
             <button onClick={() => {
                setEditValue(dataObj.value || ""); // Revert changes
                setStatus("idle");
             }} className="text-xs font-medium text-slate-400 hover:text-slate-600 transition-colors">
               Cancel
             </button>
          </div>
        )}

        {(status === "approved" || status === "rejected") && (
          <div className="flex items-center gap-2 pt-4 mt-2 border-t border-slate-100">
             <button onClick={() => setStatus("idle")} className="text-xs font-medium text-slate-400 hover:text-slate-600 transition-colors">
               Undo Action
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [tourStep, setTourStep] = useState(0);
  const [isProcessingAudio, setIsProcessingAudio] = useState(false);
  const [processingStage, setProcessingStage] = useState(0);
  const [selectedDay, setSelectedDay] = useState<string>("Day 1");
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [customUploadActive, setCustomUploadActive] = useState(false);
  
  const processingMessages = [
    `Reading ${uploadedFile?.name || 'audio file'} into memory...`,
    "Initializing Whisper v3 Audio Transcription...",
    "Aligning Audio Timestamps with Text...",
    "Running LLM Extraction Pipeline...",
    "Populating Client Intelligence Schema..."
  ];

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setUploadedFile(file);
      setIsProcessingAudio(true);
      let stage = 0;
      setProcessingStage(0);
      const interval = setInterval(() => {
        stage++;
        if (stage < processingMessages.length) {
          setProcessingStage(stage);
        } else {
          clearInterval(interval);
          setIsProcessingAudio(false);
          setCustomUploadActive(true);
          setSelectedDay("Custom Upload");
        }
      }, 1200);
    }
  };

  const transcript = selectedDay === "Custom Upload" ? CUSTOM_UPLOAD_TRANSCRIPT : (selectedDay === "All Days" ? ALL_DAYS_TRANSCRIPT : ALL_DAYS_TRANSCRIPT.filter(m => m.day === selectedDay));
  
  const data = selectedDay === "Custom Upload" ? CUSTOM_UPLOAD_DATA : ((intelligenceData as any)[selectedDay] || {
    ai_reasoning: { value: "No audio tone data found. Upload audio to generate multi-modal reasoning.", confidence: "Missing" },
    weekly_summary: { value: "No intelligence data extracted for this day yet. Click 'Upload Audio Update' to process the latest data.", confidence: "Missing" },
    metrics: {
      nutrition_adherence: { value: null, confidence: "Missing" },
      exercise_and_steps: { value: null, confidence: "Missing" },
      sleep: { value: null, confidence: "Missing" },
      water_intake: { value: null, confidence: "Missing" }
    },
    health_and_wellbeing: {
      symptoms_and_stress: { value: null, confidence: "Missing" },
      engagement_level: { value: null, confidence: "Missing" }
    },
    actionable_insights: {
      key_barriers: [],
      pending_actions: [],
      recommended_next_action: { value: null, confidence: "Missing" },
      risk_attention_flags: []
    }
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden relative">
      {/* Background Dimmer for Tutorial Spotlight */}
      {tourStep >= 0 && tourStep <= 3 && (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 pointer-events-none transition-opacity duration-300" />
      )}
      
      {/* LEFT PANE: Chat Transcript & Upload */}
      <div className={`w-[35%] border-r border-slate-200 bg-white flex flex-col h-full shadow-[4px_0_24px_rgba(0,0,0,0.03)] relative ${tourStep === 0 || tourStep === 1 ? 'z-[150]' : 'z-10'}`}>
        <div className="p-5 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0">
          
          <div className="flex items-center justify-between mb-3">
             <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
               <MessageSquare className="w-4 h-4 text-blue-500" />
               Source Transcript
             </h2>
             <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-semibold border border-blue-100">
               {transcript.length} msgs
             </span>
           </div>
           
           <div className={`relative mb-4 p-1.5 rounded-lg transition-all duration-300 ${tourStep === 0 ? 'z-[150] bg-white shadow-lg' : 'z-50'}`}>
             {tourStep === 0 && <div className="absolute inset-0 ring-4 ring-blue-500/60 rounded-lg animate-pulse pointer-events-none" />}
             <TourTooltip 
               currentStep={tourStep} targetStep={0} 
               title="1. Navigate Client Data" 
               content="Select any day from this dropdown to instantly load the textual chat transcript and the AI's intelligence report for that specific day." 
               position="bottom-left" 
               onNext={() => setTourStep(1)} onSkip={() => setTourStep(-1)} 
             />
             <select 
               value={selectedDay}
               onChange={(e) => setSelectedDay(e.target.value as any)}
               disabled={isProcessingAudio}
               className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-2 pl-3 pr-8 rounded-lg font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
             >
               <option value="Day 1">Day 1 Analysis</option>
               <option value="Day 2">Day 2 Analysis</option>
               <option value="Day 3">Day 3 Analysis</option>
               <option value="Day 4">Day 4 Analysis</option>
               <option value="Day 5">Day 5 Analysis</option>
               <option value="Day 6">Day 6 Analysis</option>
               <option value="Day 7">Day 7 Analysis</option>
               <option value="Day 8">Day 8 Analysis</option>
               <option value="All Days">Aggregate (All Days)</option>
               {customUploadActive && <option value="Custom Upload">Custom Upload: {uploadedFile?.name}</option>}
             </select>
             <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
           </div>

           {/* Audio Input Button */}
           <div className={`relative p-1.5 rounded-lg transition-all duration-300 ${tourStep === 1 ? 'z-[150] bg-white shadow-lg' : 'z-40'}`}>
             {tourStep === 1 && <div className="absolute inset-0 ring-4 ring-blue-500/60 rounded-lg animate-pulse pointer-events-none" />}
             <TourTooltip 
               currentStep={tourStep} targetStep={1} 
               title="2. Analyze Call Recordings" 
               content="This uploads a simulated audio recording. The AI will ingest the call, perform sentiment analysis, and generate a custom intelligence report." 
               position="bottom-left" 
               onNext={() => setTourStep(2)} onSkip={() => setTourStep(-1)} 
             />
             <input 
               type="file" 
               id="audio-upload" 
               accept="audio/*" 
               className="hidden" 
               onChange={handleAudioUpload} 
               disabled={isProcessingAudio}
             />
             <label 
               htmlFor="audio-upload"
               className={`w-full border border-dashed border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer ${isProcessingAudio ? 'opacity-50 pointer-events-none' : ''}`}
             >
               <FileAudio className="w-4 h-4" />
               {isProcessingAudio ? "Processing Audio..." : "Analyze Call Recording"}
             </label>
           </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {!isProcessingAudio && transcript.length > 0 && transcript.map((msg: any) => (
            <div key={msg.id} className={`flex flex-col ${msg.speaker === 'Coach' || msg.speaker === 'Accountability Coach' ? 'items-end' : 'items-start'}`}>
              <div className="flex items-center gap-2 mb-1.5 px-1">
                <span className="text-xs font-medium text-slate-400">{msg.time}</span>
                <span className={`text-xs font-bold ${msg.speaker === 'Coach' || msg.speaker === 'Accountability Coach' ? 'text-blue-600' : 'text-slate-700'}`}>
                  {msg.speaker} {msg.day !== selectedDay && selectedDay === "All Days" && <span className="font-normal text-slate-400 ml-1">({msg.day})</span>}
                </span>
              </div>
              <div className={`p-3.5 rounded-2xl max-w-[85%] text-[14px] leading-relaxed shadow-sm ${
                msg.speaker === 'Coach' || msg.speaker === 'Accountability Coach'
                  ? 'bg-blue-600 text-white rounded-tr-sm' 
                  : msg.speaker === 'System' ? 'bg-slate-800 text-slate-300 w-full text-center italic'
                  : 'bg-slate-100 text-slate-800 rounded-tl-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {!isProcessingAudio && transcript.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 opacity-60">
              <MessageSquare className="w-12 h-12 text-slate-300 mb-4" />
              <p className="text-slate-600 font-bold mb-1">No conversation recorded</p>
              <p className="text-sm text-slate-400">Click "Upload Audio Update" to simulate ingesting data for this day.</p>
            </div>
          )}
          {isProcessingAudio && (
             <div className="h-full flex items-center justify-center">
                <div className="flex flex-col gap-3 w-full max-w-[80%] opacity-40 animate-pulse">
                   <div className="h-12 bg-slate-200 rounded-2xl w-3/4 rounded-bl-sm"></div>
                   <div className="h-16 bg-slate-200 rounded-2xl w-full rounded-br-sm self-end"></div>
                   <div className="h-10 bg-slate-200 rounded-2xl w-1/2 rounded-bl-sm"></div>
                </div>
             </div>
          )}
        </div>
      </div>

      {/* RIGHT PANE: Intelligence Dashboard */}
      <div className={`w-[65%] flex flex-col h-full bg-[#FAFAFA] overflow-hidden relative ${tourStep >= 2 ? 'z-[150]' : 'z-10'}`}>
        
        {/* Processing State */}
        {isProcessingAudio && (
           <div className="absolute inset-0 bg-slate-900 z-30 flex flex-col items-center justify-center p-12 text-center text-white">
              <Cpu className="w-16 h-16 text-blue-400 mb-8 animate-pulse" />
              <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Processing Multi-Modal Data</h2>
              <p className="text-blue-300 mb-10 max-w-md text-sm font-medium h-6">
                {processingMessages[processingStage]}
              </p>
              
              {/* Progress bar */}
              <div className="w-64 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                 <div 
                   className="h-full bg-blue-500 rounded-full transition-all duration-300 ease-out" 
                   style={{ width: `${((processingStage + 1) / processingMessages.length) * 100}%` }}
                 ></div>
              </div>
           </div>
        )}

        {!isProcessingAudio && data && (
          <>
            <div className="p-6 border-b border-slate-200 bg-white sticky top-0 z-10 flex justify-between items-center shadow-sm">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                  Client Intelligence
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-md">{selectedDay}</span>
                </h1>
                <p className="text-slate-500 text-sm mt-1">AI-extracted insights with confidence grounding</p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={handleSave}
                  disabled={isSaving || isSaved}
                  className={`px-4 py-2 text-white rounded-lg text-sm font-semibold transition-all shadow-sm flex items-center gap-2
                    ${isSaved ? 'bg-green-600' : 'bg-slate-900 hover:bg-slate-800'} 
                    ${isSaving ? 'opacity-70 cursor-wait' : ''}
                  `}
                >
                  {isSaving && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                  {isSaved && <Check className="w-4 h-4" />}
                  {isSaving ? "Saving..." : isSaved ? "Saved to Profile!" : "Save to Profile"}
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8" key={selectedDay}>
              <div className="max-w-4xl mx-auto space-y-10">

                {/* AI Decision Reasoning */}
                <section className={`mb-8 transition-all duration-300 ${tourStep === 2 || tourStep === 3 ? 'relative z-[200]' : ''}`}>
                  <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <BrainCircuit className="w-5 h-5 text-purple-500" />
                    AI Decision Reasoning & Context
                  </h2>
                  <InsightCard tourStep={tourStep} setTourStep={setTourStep} title="Synthesized Reasoning" icon={Cpu} dataObj={data.ai_reasoning} specialStyle={true} />
                </section>
                
                {/* Weekly Summary */}
                <section className="mb-8 relative z-10">
                  <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-slate-500" />
                    {selectedDay === "All Days" ? "Aggregate Overview" : "Daily Overview"}
                  </h2>
                  <InsightCard title="AI Summary" icon={Info} dataObj={data.weekly_summary} />
                </section>

                {/* Metrics Grid */}
                <section>
                  <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-slate-500" />
                    Health Metrics
                  </h2>
                  <div className="grid grid-cols-2 gap-5">
                    <InsightCard tourStep={tourStep} setTourStep={setTourStep} title="Nutrition Adherence" icon={Utensils} dataObj={data.metrics.nutrition_adherence} />
                    <InsightCard tourStep={tourStep} setTourStep={setTourStep} title="Exercise & Steps" icon={Activity} dataObj={data.metrics.exercise_and_steps} />
                    <InsightCard tourStep={tourStep} setTourStep={setTourStep} title="Sleep Quality" icon={Moon} dataObj={data.metrics.sleep} />
                    <InsightCard tourStep={tourStep} setTourStep={setTourStep} title="Water Intake" icon={Droplets} dataObj={data.metrics.water_intake} />
                  </div>
                </section>

                {/* Health & Wellbeing */}
                <section>
                  <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-slate-500" />
                    Health & Wellbeing
                  </h2>
                  <div className="grid grid-cols-2 gap-5">
                    <InsightCard tourStep={tourStep} setTourStep={setTourStep} title="Symptoms & Stress" icon={AlertTriangle} dataObj={data.health_and_wellbeing.symptoms_and_stress} />
                    <InsightCard tourStep={tourStep} setTourStep={setTourStep} title="Engagement Level" icon={UserCheck} dataObj={data.health_and_wellbeing.engagement_level} />
                  </div>
                </section>

                {/* Flags & Actionable Insights */}
                <section>
                  <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-slate-500" />
                    Risk Flags & Barriers
                  </h2>
                  
                  <div className="grid grid-cols-1 gap-5">
                    {/* Render Flag */}
                    {data.actionable_insights.risk_attention_flags.map((flag: any, idx: number) => (
                      <div key={idx} className="bg-red-50/50 border border-red-200 rounded-xl p-5 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
                        
                        <div className="flex items-start justify-between mb-3 mt-1">
                          <div className="flex items-center gap-2">
                             <div className="p-2 bg-white rounded-lg border border-red-100 text-red-600">
                               <AlertTriangle className="w-4 h-4" />
                             </div>
                             <h3 className="font-semibold text-red-900">Risk Flag: {flag.priority} Priority</h3>
                          </div>
                          <ConfidenceBadge confidence={flag.confidence} />
                        </div>
                        
                        <p className="text-red-800 text-sm mt-3 leading-relaxed">{flag.issue_description}</p>
                        
                        {flag.supporting_evidence && (
                          <div className="mt-4 bg-white/60 border-l-4 border-red-300 p-3 rounded-r-lg">
                            <p className="text-[11px] text-red-600 font-bold mb-1 uppercase tracking-wider flex items-center gap-1">
                              <MessageSquare className="w-3 h-3" /> Supporting Quote
                            </p>
                            <p className="text-sm text-red-700 italic">"{flag.supporting_evidence}"</p>
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Render Barrier */}
                    {data.actionable_insights.key_barriers.map((barrier: any, idx: number) => (
                      <InsightCard key={idx} title="Key Barrier" icon={AlertTriangle} dataObj={barrier} />
                    ))}

                    {/* Render Pending Actions */}
                    {data.actionable_insights.pending_actions.map((action: any, idx: number) => (
                      <InsightCard key={idx} title="Pending Action" icon={CheckCircle2} dataObj={action} />
                    ))}

                    {/* Render Recommended Action */}
                    <InsightCard 
                      title="Recommended Next Action for Coach" 
                      icon={Info} 
                      dataObj={data.actionable_insights.recommended_next_action} 
                    />
                  </div>
                </section>

              </div>
            </div>
          </>
        )}
      </div>

      {/* Toast Notification */}
      {isSaved && (
        <div className="fixed bottom-8 right-8 bg-slate-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-[bounce_0.3s_ease-out] z-50 border border-slate-700">
          <div className="bg-green-400 rounded-full p-1">
            <Check className="w-4 h-4 text-slate-900 font-bold" />
          </div>
          <div>
            <p className="font-bold text-sm">Profile Updated</p>
            <p className="text-slate-300 text-xs">Intelligence data for {selectedDay} has been saved.</p>
          </div>
        </div>
      )}
    </div>
  );
}
