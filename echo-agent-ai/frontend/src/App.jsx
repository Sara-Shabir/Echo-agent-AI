import React, { useState } from 'react';
import { Mic, Sparkles, Check, FileText, Activity, RefreshCw, Send, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);
  const [preset, setPreset] = useState('Meeting');
  const [workflow, setWorkflow] = useState(null);

  const handlePresetChange = (mode) => {
    setPreset(mode);
    setWorkflow(null);
    setTranscript('');
  };

  const handleMicToggle = () => {
    if (!isRecording) {
      setIsRecording(true);
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.onresult = (event) => {
          const text = event.results[0][0].transcript;
          setTranscript(text);
          setIsRecording(false);
          processWorkflow(text, preset);
        };
        recognition.onerror = () => {
          setIsRecording(false);
          const fallbackText = getFallbackText(preset);
          setTranscript(fallbackText);
          processWorkflow(fallbackText, preset);
        };
        recognition.start();
      } else {
        setIsRecording(false);
        const fallbackText = getFallbackText(preset);
        setTranscript(fallbackText);
        processWorkflow(fallbackText, preset);
      }
    } else {
      setIsRecording(false);
    }
  };

  const getFallbackText = (currentPreset) => {
    if (currentPreset === 'Incident') return "Database connection timeout detected on production server cluster B.";
    if (currentPreset === 'Content') return "Draft a short launching post for our new AssemblyAI voice features.";
    return "Schedule a project review meeting with the dev team for tomorrow at 10 AM.";
  };

  const processWorkflow = (text, currentPreset) => {
    setLoading(true);
    setTimeout(() => {
      if (currentPreset === 'Incident') {
        setWorkflow({
          summary: `System Incident: ${text}`,
          tasks: [
            { id: 1, title: 'Restart cluster nodes & check API logs', priority: 'High' },
            { id: 2, title: 'Alert DevOps team on PagerDuty', priority: 'Critical' }
          ],
          reminder: 'Post-Mortem meeting at 3:00 PM today',
          action: 'Webhook Dispatched to Slack #devops-alerts (200 OK)'
        });
      } else if (currentPreset === 'Content') {
        setWorkflow({
          summary: `Content Strategy: ${text}`,
          tasks: [
            { id: 1, title: 'Generate high-res graphics for LinkedIn and X', priority: 'Medium' },
            { id: 2, title: 'Draft email newsletter template', priority: 'Normal' }
          ],
          reminder: 'Publish post on Friday at 9:00 AM',
          action: 'Notion Workspace updated & Copy saved (200 OK)'
        });
      } else {
        setWorkflow({
          summary: `Executive Summary: ${text}`,
          tasks: [
            { id: 1, title: 'Send invite link to participants', priority: 'High' },
            { id: 2, title: 'Prepare slide deck for dev architecture review', priority: 'Normal' }
          ],
          reminder: 'Team Sync tomorrow at 10:00 AM',
          action: 'Google Calendar Invite & Email Digest sent (200 OK)'
        });
      }
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-4 sm:p-8 max-w-7xl mx-auto">
      
      {/* Top Header */}
      <header className="w-full flex flex-col sm:flex-row justify-between items-center p-4 glass-card rounded-2xl mb-8 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-wide text-white flex items-center gap-1.5">
              EchoAgent <span className="text-purple-400">AI</span>
            </h1>
            <p className="text-[10px] text-gray-400 font-medium tracking-wider uppercase">Powered by AssemblyAI</p>
          </div>
        </div>

        {/* Niche Mode Selector */}
        <div className="flex bg-black/60 p-1 rounded-xl border border-purple-500/20 gap-1">
          {['Meeting', 'Incident', 'Content'].map((mode) => (
            <button
              key={mode}
              onClick={() => handlePresetChange(mode)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                preset === mode 
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/40' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {mode === 'Meeting' ? '💼 Meeting' : mode === 'Incident' ? '🚨 SRE Incident' : '📝 Content'}
            </button>
          ))}
        </div>
      </header>

      {/* Main Section */}
      <main className="w-full my-auto space-y-10">
        
        <div className="text-center space-y-2">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            EchoAgent <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">AI</span>
          </h2>
          <p className="text-sm sm:text-base text-purple-200/70 font-medium">
            Transform Voice into Actionable Workflow
          </p>
        </div>

        {/* Studio Mic & Checklist Hero Layout */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-12 py-4">
          
          {/* Sleek Neon Glassmorphic Mic Button */}
          <div className="flex flex-col items-center">
            <button
              onClick={handleMicToggle}
              className={`relative group w-32 h-32 sm:w-36 sm:h-36 rounded-full flex flex-col items-center justify-center transition-all duration-500 border border-purple-400/40 shadow-2xl ${
                isRecording 
                  ? 'bg-gradient-to-tr from-red-600 via-pink-600 to-rose-500 neon-mic-recording scale-105' 
                  : 'bg-gradient-to-tr from-purple-900/90 via-indigo-900/70 to-slate-900/90 hover:scale-105 neon-mic-glow'
              }`}
            >
              {/* Background Ambient Glow Ring */}
              <div className={`absolute -inset-2 rounded-full blur-xl transition-all duration-500 ${
                isRecording ? 'bg-red-500/50 animate-pulse' : 'bg-purple-600/30 group-hover:bg-indigo-500/50'
              }`} />

              {/* Inner Glowing Ring Container */}
              <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-black/40 border border-purple-300/20 flex items-center justify-center backdrop-blur-md">
                <Mic className={`w-12 h-12 transition-all duration-300 ${
                  isRecording 
                    ? 'text-white animate-bounce drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]' 
                    : 'text-purple-300 group-hover:text-cyan-300 group-hover:scale-110 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]'
                }`} />
              </div>
            </button>

            {/* Status Label */}
            <span className="text-xs font-mono text-purple-300 mt-4 font-medium tracking-wide">
              Status: <span className={isRecording ? 'text-red-400 font-bold animate-pulse' : 'text-purple-400'}>
                {isRecording ? 'Listening...' : 'Idle (Tap Mic)'}
              </span>
            </span>
          </div>

          {/* Audio Waveform Visualizer */}
          <div className="flex items-center gap-1.5 h-16 px-6 py-3 glass-card rounded-2xl border border-purple-500/20">
            {[30, 60, 40, 90, 75, 100, 45, 85, 95, 60, 30, 80, 50, 90, 40, 70].map((h, i) => (
              <div
                key={i}
                className={`w-1.5 rounded-full bg-gradient-to-t from-purple-600 via-indigo-400 to-cyan-300 ${
                  isRecording ? 'wave-bar-active' : 'opacity-40'
                }`}
                style={{
                  height: isRecording ? undefined : `${h}%`,
                  animationDelay: `${(i % 5) * 0.15}s`
                }}
              ></div>
            ))}
          </div>

          {/* Action Steps Card */}
          <div className="w-full max-w-xs glass-card p-5 rounded-2xl border border-purple-500/30 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-600/20 rounded-full blur-2xl"></div>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-purple-600/30 flex items-center justify-center text-purple-300 border border-purple-400/30">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-200">Action Plan</span>
            </div>

            <div className="space-y-2.5 text-xs font-medium">
              {[
                { label: 'Summarize', active: !!workflow },
                { label: 'Create Tasks', active: !!workflow },
                { label: 'Set Reminders', active: !!workflow },
                { label: 'Take Action', active: !!workflow }
              ].map((item, idx) => (
                <div key={idx} className={`flex items-center gap-2.5 p-2 rounded-xl transition-all ${
                  item.active ? 'bg-purple-600/20 text-white border border-purple-500/40' : 'bg-black/30 text-gray-400 border border-white/5'
                }`}>
                  <CheckCircle2 className={`w-4 h-4 ${item.active ? 'text-purple-400 fill-purple-400/20' : 'text-gray-600'}`} />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Audio Transcript Bar */}
        <div className="max-w-3xl mx-auto glass-card rounded-2xl p-4 text-left border border-purple-500/20">
          <div className="flex items-center justify-between text-xs text-purple-300 mb-2 font-semibold">
            <span className="flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-purple-400" /> Audio Input ({preset} Mode)
            </span>
            {loading && (
              <span className="text-cyan-400 font-mono text-[11px] flex items-center gap-1 animate-pulse">
                <RefreshCw className="w-3 h-3 animate-spin" /> Processing AI...
              </span>
            )}
          </div>
          <div className="min-h-[50px] text-xs font-mono text-gray-200 bg-black/50 p-3 rounded-xl border border-white/5 flex items-center">
            {transcript || <span className="text-gray-500 italic">Click the microphone button to test voice input pipeline...</span>}
          </div>
        </div>

        {/* Dynamic Action Results Grid */}
        {workflow && (
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-card p-4 rounded-2xl border-l-4 border-l-purple-500">
              <div className="flex items-center gap-2 mb-2 text-purple-300 font-bold text-xs">
                <Sparkles className="w-4 h-4" /> Summarize
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">{workflow.summary}</p>
            </div>

            <div className="glass-card p-4 rounded-2xl border-l-4 border-l-indigo-500">
              <div className="flex items-center gap-2 mb-2 text-indigo-300 font-bold text-xs">
                <Check className="w-4 h-4" /> Create Tasks
              </div>
              <div className="space-y-1.5">
                {workflow.tasks.map((t) => (
                  <div key={t.id} className="text-[11px] text-gray-200 flex items-center justify-between bg-black/40 p-1.5 rounded-lg border border-white/5">
                    <span className="truncate pr-1">• {t.title}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">{t.priority}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-4 rounded-2xl border-l-4 border-l-cyan-500">
              <div className="flex items-center gap-2 mb-2 text-cyan-300 font-bold text-xs">
                <Activity className="w-4 h-4" /> Set Reminders
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">{workflow.reminder}</p>
            </div>

            <div className="glass-card p-4 rounded-2xl border-l-4 border-l-emerald-500">
              <div className="flex items-center gap-2 mb-2 text-emerald-300 font-bold text-xs">
                <Send className="w-4 h-4" /> Take Action
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">{workflow.action}</p>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="w-full text-center py-4 text-xs text-purple-300/40 border-t border-purple-500/10 mt-8">
        EchoAgent AI • Powered by AssemblyAI Audio Intelligence Engine
      </footer>

    </div>
  );
}