import { useState } from 'react';
import { 
  CheckCircle2, Edit2, XCircle, Info, MessageSquare, 
  Activity, Utensils, Moon, Droplets, AlertTriangle, UserCheck, Check, Calendar, ChevronDown
} from 'lucide-react';

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

  // Day 3-8 Snippets for "All Days" View Context
  { id: 201, day: "Day 7", speaker: "Client", time: "04:00 PM", text: "There is a lot of office pressure and politics going on. During a meeting today I was so tired that my head went down on the table and I actually slept for a few seconds." },
  { id: 202, day: "Day 8", speaker: "Client", time: "09:00 AM", text: "Slept better last night, around 8 hours. Energy feels much better today. Water around 3.5 litres." },
  { id: 203, day: "Day 8", speaker: "Coach", time: "10:00 AM", text: "That is good progress. Let’s continue tracking sleep, bloating, meals and movement consistently." }
];

const transcriptsByDay = {
  "Day 1": ALL_DAYS_TRANSCRIPT.filter(m => m.day === "Day 1"),
  "Day 2": ALL_DAYS_TRANSCRIPT.filter(m => m.day === "Day 2"),
  "All Days": ALL_DAYS_TRANSCRIPT
};

const intelligenceData = {
  "Day 1": {
    weekly_summary: {
      value: "The client started the day feeling generally happy and completed household chores, but experienced acidity and only got 5 hours of sleep due to staying up late for their daughter's exams.",
      supporting_evidence: "Slept only around 5 hours last night... Generally feeling happy today... Got up with acidity.",
      confidence: "AI-Inferred"
    },
    metrics: {
      nutrition_adherence: {
        value: "Had tea, soaked nuts, and kadhi with soya and green vegetables. Skipped salad due to lack of groceries.",
        supporting_evidence: "Lunch was kadhi with soya and green vegetables... No. I still need to stock vegetables properly.",
        confidence: "Client-Reported"
      },
      exercise_and_steps: {
        value: "Household chores, Surya Namaskar, walking inside, and a 15-minute post-meal walk.",
        supporting_evidence: "Did some mopping, sweeping, Surya Namaskar... Yes, around 15 minutes.",
        confidence: "Client-Reported"
      },
      sleep: {
        value: "5 hours of sleep.",
        supporting_evidence: "Slept only around 5 hours last night.",
        confidence: "Client-Reported"
      },
      water_intake: { value: null, supporting_evidence: null, confidence: "Missing" }
    },
    health_and_wellbeing: {
      symptoms_and_stress: {
        value: "Woke up with acidity after sleeping late and doing a lot of work. Despite this, reported generally feeling happy.",
        supporting_evidence: "Generally feeling happy today... Got up with acidity.",
        confidence: "Client-Reported"
      },
      engagement_level: {
        value: "High",
        supporting_evidence: "Detailed logs provided without prompting.",
        confidence: "AI-Inferred"
      }
    },
    actionable_insights: {
      key_barriers: [
        { value: "Lack of proper groceries (vegetables) prevented the client from eating a salad before lunch.", supporting_evidence: "No. I still need to stock vegetables properly. Will do it tomorrow.", confidence: "Client-Reported" }
      ],
      pending_actions: [
        { value: "Client needs to stock vegetables properly to prepare salads.", supporting_evidence: "I still need to stock vegetables properly. Will do it tomorrow.", confidence: "Client-Reported" }
      ],
      recommended_next_action: { value: "Check in with the client tomorrow morning specifically regarding their acidity and whether they managed to get groceries.", supporting_evidence: "Got up with acidity... Will do it tomorrow.", confidence: "AI-Inferred" },
      risk_attention_flags: [
        { issue_description: "Client only got 5 hours of sleep and is experiencing acidity, possibly due to overworking and late nights.", priority: "Medium", supporting_evidence: "Slept only around 5 hours last night... Slept very late and did a lot of work today.", confidence: "AI-Inferred" }
      ]
    }
  },
  "Day 2": {
    weekly_summary: {
      value: "Client completed basic water and walking goals but ate extremely little throughout the day, resulting in continued acidity and bloating.",
      supporting_evidence: "Walk and water done... Didn’t eat much in the evening... Still having acidity and bloating.",
      confidence: "AI-Inferred"
    },
    metrics: {
      nutrition_adherence: {
        value: "Client skipped meals and ate only 1 cup tea, 1 apple, and a small piece of paneer. Requested banana stem juice.",
        supporting_evidence: "Tea 1 cup and 1 apple... Didn’t eat much in the evening. Just a small piece of paneer.",
        confidence: "Client-Reported"
      },
      exercise_and_steps: {
        value: "Completed daily walk.",
        supporting_evidence: "Walk and water done.",
        confidence: "Client-Reported"
      },
      sleep: { value: null, supporting_evidence: null, confidence: "Missing" },
      water_intake: {
        value: "Completed daily water goals.",
        supporting_evidence: "Walk and water done.",
        confidence: "Client-Reported"
      }
    },
    health_and_wellbeing: {
      symptoms_and_stress: {
        value: "Still experiencing acidity and bloating, likely exacerbated by skipping meals.",
        supporting_evidence: "Still having acidity and bloating.",
        confidence: "Client-Reported"
      },
      engagement_level: { value: "Medium", supporting_evidence: "Brief updates provided.", confidence: "AI-Inferred" }
    },
    actionable_insights: {
      key_barriers: [
        { value: "Drastically undereating and skipping meals, causing digestive issues.", supporting_evidence: "Didn’t eat much in the evening. Just a small piece of paneer.", confidence: "AI-Inferred" }
      ],
      pending_actions: [],
      recommended_next_action: { value: "Work with the client to establish a simple, easy-to-follow meal structure so they stop skipping meals.", supporting_evidence: "Please don’t skip meals completely. Try to keep the meals simple.", confidence: "AI-Inferred" },
      risk_attention_flags: [
        { issue_description: "Severe calorie restriction/skipping meals leading to continued acidity and bloating.", priority: "High", supporting_evidence: "Didn’t eat much... Still having acidity and bloating.", confidence: "AI-Inferred" }
      ]
    }
  },
  "All Days": {
    weekly_summary: {
      value: "Over the week, the client struggled with sleep, acidity, and skipping meals due to a hectic schedule and stress. However, by Day 8, sleep improved to 8 hours and energy significantly increased.",
      supporting_evidence: "so tired that my head went down... Slept better last night, around 8 hours. Energy feels much better today.",
      confidence: "AI-Inferred"
    },
    metrics: {
      nutrition_adherence: {
        value: "Highly inconsistent. Often skipped meals or lacked protein due to poor planning.",
        supporting_evidence: "Didn't eat much in the evening... Protein was also missing.",
        confidence: "AI-Inferred"
      },
      exercise_and_steps: {
        value: "Consistent. Averaged 4,500 to 8,000 steps daily with occasional 20-30 min stretches/walks.",
        supporting_evidence: "Steps 6,000 today... Steps around 8,000... Did 30 minutes exercise.",
        confidence: "Confirmed Fact"
      },
      sleep: {
        value: "Started poor (5-5.5 hours) due to stress, but recovered to 8 hours by the end of the week.",
        supporting_evidence: "Slept only around 5 hours... Slept better last night, around 8 hours.",
        confidence: "Client-Reported"
      },
      water_intake: {
        value: "Generally hitting 3.5 to 4 litres when reported.",
        supporting_evidence: "Water 4 litres... Water around 3.5 litres.",
        confidence: "Client-Reported"
      }
    },
    health_and_wellbeing: {
      symptoms_and_stress: {
        value: "Persistent acidity and bloating early in the week. Extreme fatigue mid-week (fell asleep at work). Improved energy by Day 8.",
        supporting_evidence: "so tired that my head went down on the table... Energy feels much better today.",
        confidence: "Client-Reported"
      },
      engagement_level: {
        value: "High",
        supporting_evidence: "The client logged updates consistently across all 8 days despite severe work stress.",
        confidence: "AI-Inferred"
      }
    },
    actionable_insights: {
      key_barriers: [
        { value: "Lack of meal planning time and hectic work/school schedule.", supporting_evidence: "I am not getting enough time to plan meals.", confidence: "Client-Reported" },
        { value: "High stress and office politics draining energy.", supporting_evidence: "There is a lot of office pressure and politics going on.", confidence: "Client-Reported" }
      ],
      pending_actions: [
        { value: "Client needs to order sprouts/vegetables and set ACV reminders.", supporting_evidence: "Have ordered them... Forgot ACV today.", confidence: "Client-Reported" }
      ],
      recommended_next_action: { value: "Focus on sleep hygiene and practical, quick meal prep to stabilize energy and digestion. Praise them for the consistency.", supporting_evidence: "That could be one of the main barriers right now. Let’s keep the plan practical.", confidence: "AI-Inferred" },
      risk_attention_flags: [
        { issue_description: "Mid-week crash due to exhaustion, leading to falling asleep at work.", priority: "High", supporting_evidence: "During a meeting today I was so tired that my head went down on the table", confidence: "Confirmed Fact" }
      ]
    }
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

const InsightCard = ({ title, icon: Icon, dataObj }: any) => {
  const [status, setStatus] = useState<"idle" | "approved" | "rejected" | "editing">("idle");

  if (!dataObj) return null;
  
  // Visual state based on button clicks
  const cardOpacity = status === "rejected" ? "opacity-50 grayscale" : "opacity-100";
  const approvedBg = status === "approved" ? "bg-green-50/50 border-green-300" : "bg-white border-slate-200";

  return (
    <div className={`${approvedBg} border rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 mb-4 group relative overflow-hidden ${cardOpacity}`}>
      {/* Accent line on top based on confidence */}
      {status === "idle" && (
        <div className={`absolute top-0 left-0 w-full h-1 ${
          dataObj.confidence === 'Confirmed Fact' ? 'bg-green-400' :
          dataObj.confidence === 'Client-Reported' ? 'bg-yellow-400' :
          dataObj.confidence === 'AI-Inferred' ? 'bg-purple-400' : 'bg-gray-300'
        }`} />
      )}
      {status === "approved" && <div className="absolute top-0 left-0 w-full h-1 bg-green-500" />}
      
      <div className="flex items-start justify-between mb-3 mt-1">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg border ${status === "approved" ? "bg-green-100 border-green-200 text-green-600" : "bg-slate-50 border-slate-100 text-slate-500"}`}>
            {status === "approved" ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
          </div>
          <h3 className={`font-semibold ${status === "approved" ? "text-green-800" : "text-slate-800"}`}>{title}</h3>
        </div>
        <div className="flex items-center gap-2">
           {status === "approved" && <span className="text-xs font-bold text-green-600 uppercase tracking-wider">Approved</span>}
           {status === "rejected" && <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Rejected</span>}
           <ConfidenceBadge confidence={dataObj.confidence} />
        </div>
      </div>
      
      <div className="mt-4 space-y-4">
        <p className="text-slate-700 text-sm leading-relaxed">
          {dataObj.value || <span className="italic text-slate-400">No data extracted for this period.</span>}
        </p>
        
        {dataObj.supporting_evidence && status !== "rejected" && (
          <div className="bg-slate-50 border-l-4 border-slate-300 p-3 rounded-r-lg">
            <p className="text-[11px] text-slate-500 font-bold mb-1 uppercase tracking-wider flex items-center gap-1">
              <MessageSquare className="w-3 h-3" /> Supporting Quote
            </p>
            <p className="text-sm text-slate-600 italic">"{dataObj.supporting_evidence}"</p>
          </div>
        )}
        
        {dataObj.value && status === "idle" && (
          <div className="flex items-center gap-2 pt-4 mt-2 border-t border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity">
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

        {status !== "idle" && (
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
  const [selectedDay, setSelectedDay] = useState<"Day 1" | "Day 2" | "All Days">("Day 1");
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const transcript = transcriptsByDay[selectedDay];
  const data = intelligenceData[selectedDay];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }, 1500);
  };

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => setIsRegenerating(false), 2000);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* LEFT PANE: Chat Transcript */}
      <div className="w-[35%] border-r border-slate-200 bg-white flex flex-col h-full shadow-[4px_0_24px_rgba(0,0,0,0.03)] z-10">
        <div className="p-5 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-500" />
              Source Transcript
            </h2>
            <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded text-xs font-semibold">{transcript.length} msgs</span>
          </div>
          
          {/* Day Selector */}
          <div className="relative">
            <select 
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value as any)}
              className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-2 pl-3 pr-8 rounded-lg font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            >
              <option value="Day 1">Day 1 Analysis</option>
              <option value="Day 2">Day 2 Analysis</option>
              <option value="All Days">Aggregate (All Days)</option>
            </select>
            <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {transcript.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.speaker === 'Coach' ? 'items-end' : 'items-start'}`}>
              <div className="flex items-center gap-2 mb-1.5 px-1">
                <span className="text-xs font-medium text-slate-400">{msg.time}</span>
                <span className={`text-xs font-bold ${msg.speaker === 'Coach' ? 'text-blue-600' : 'text-slate-700'}`}>
                  {msg.speaker} {msg.day !== selectedDay && selectedDay === "All Days" && <span className="font-normal text-slate-400 ml-1">({msg.day})</span>}
                </span>
              </div>
              <div className={`p-3.5 rounded-2xl max-w-[85%] text-[14px] leading-relaxed shadow-sm ${
                msg.speaker === 'Coach' 
                  ? 'bg-blue-600 text-white rounded-tr-sm' 
                  : msg.speaker === 'System' ? 'bg-slate-800 text-slate-300 w-full text-center italic'
                  : 'bg-slate-100 text-slate-800 rounded-tl-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANE: Intelligence Dashboard */}
      <div className="w-[65%] flex flex-col h-full bg-[#FAFAFA] overflow-hidden relative">
        
        {/* Loading Overlay */}
        {isRegenerating && (
           <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-50 flex items-center justify-center">
             <div className="bg-white p-6 rounded-xl shadow-xl border border-slate-200 flex flex-col items-center">
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                <h3 className="font-bold text-slate-800">Regenerating Intelligence...</h3>
                <p className="text-sm text-slate-500 mt-1">Analyzing {selectedDay} transcript</p>
             </div>
           </div>
        )}

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
              onClick={handleRegenerate}
              className="px-4 py-2 bg-white text-slate-700 border border-slate-300 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-50"
            >
              Regenerate
            </button>
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
            
            {/* Weekly Summary */}
            <section>
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
                <InsightCard title="Nutrition Adherence" icon={Utensils} dataObj={data.metrics.nutrition_adherence} />
                <InsightCard title="Exercise & Steps" icon={Activity} dataObj={data.metrics.exercise_and_steps} />
                <InsightCard title="Sleep Quality" icon={Moon} dataObj={data.metrics.sleep} />
                <InsightCard title="Water Intake" icon={Droplets} dataObj={data.metrics.water_intake} />
              </div>
            </section>

            {/* Health & Wellbeing */}
            <section>
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-slate-500" />
                Health & Wellbeing
              </h2>
              <div className="grid grid-cols-2 gap-5">
                <InsightCard title="Symptoms & Stress" icon={AlertTriangle} dataObj={data.health_and_wellbeing.symptoms_and_stress} />
                <InsightCard title="Engagement Level" icon={UserCheck} dataObj={data.health_and_wellbeing.engagement_level} />
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
                {data.actionable_insights.risk_attention_flags.map((flag, idx) => (
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
                {data.actionable_insights.key_barriers.map((barrier, idx) => (
                  <InsightCard key={idx} title="Key Barrier" icon={AlertTriangle} dataObj={barrier} />
                ))}

                {/* Render Pending Actions */}
                {data.actionable_insights.pending_actions.map((action, idx) => (
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
      </div>
    </div>
  );
}
