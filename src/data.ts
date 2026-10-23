// Copy and claims for the AnyChat landing. Every claim here is checked against the app
// (see README › Keeping claims true); change it in one place.
import { SITE_URL } from './consts';

export const title = 'AnyChat: Every AI Model in One Mac App | MacPaw';
export const description = 'One native Mac chat for every model: frontier models included with Setapp, your own API keys, or models that run on your Mac. Switch mid-conversation, compare two answers, keep everything local. Free to try on Setapp.';
export const ogTitle = 'AnyChat — Every model. One chat.';
export const ogImage = `${SITE_URL}/assets/og/landing.png`;

// Hero copy variants for message-matched ad groups: ?v=keys, ?v=local or ?v=compare.
// The default stays for organic traffic; main.js swaps the three strings in place.
export const heroVariants = {
  keys:    { l1: 'Your API keys deserve', l2: 'a better chat.', sub: 'OpenAI, Anthropic, Gemini, OpenRouter, Ollama. One native Mac window, keys in the Keychain, costs on a dashboard.' },
  local:   { l1: 'Chat with AI.', l2: 'Even offline.', sub: 'Apple Intelligence and open models run on your Mac. Nothing leaves it unless you pick a cloud model.' },
  compare: { l1: 'Ask two models', l2: 'the same thing.', sub: 'One question, two answers side by side. Keep the one you like and carry on.' },
};

export const heroPoints = ['Frontier models included with Setapp', 'Your own API keys, if you have them', 'On-device models that work offline'];

// How it works: one real capture per step. Both pictures are the Debug build on 2026-10-23 (test data; retake with a real project).
export const steps = [
  { title: 'Ask, in one window', text: 'A native Mac chat with search, personas and a menu-bar Quick Chat. Pick a model from the picker or let the current one answer.', src: '/assets/shots/chat-agent.png', alt: 'AnyChat with the conversation list on the left, a reply with an agent plan, and the composer with Skills, Persona and model controls' },
  { title: 'Switch, or ask another model', text: 'Change the model mid-conversation without losing context, or ask another model the same thing and see both answers side by side.', src: '/assets/shots/compare.png', alt: 'The Same question, two models panel: an on-device model on the left, a cloud model on the right' },
  { title: 'Then go further', text: 'Personas with their own setup, documents the answers cite, skills that plan and run steps, and a dashboard for what it all costs.', src: '/assets/shots/chat-agent.png', alt: 'An agent skill working through a four-step plan with the files it read and the command it ran' },
];

// The three places models run. Provider names are the app's own (Settings › Providers presets; AppContent.json).
export const sources = [
  { icon: 'sparkles', tag: 'Cloud', title: 'Setapp AI+', line: 'Frontier models included with your Setapp subscription. No keys to paste.',
    models: ['GPT', 'Claude', 'Gemini', 'Grok', 'DeepSeek', 'Llama', 'Mistral', 'Qwen'], foot: 'Billed in Setapp AI coins, shared with other Setapp apps' },
  { icon: 'key', tag: 'Your key', title: 'Bring your own key', line: 'OpenAI, Anthropic, Google Gemini, OpenRouter, Ollama, or any OpenAI-compatible endpoint.',
    models: ['OpenAI', 'Anthropic', 'Gemini', 'OpenRouter', 'Ollama', 'Custom'], foot: 'Your provider bills you. Keys stay in the macOS Keychain' },
  { icon: 'cpu', tag: 'On your Mac', title: 'On-device', line: 'Apple Intelligence, plus open models downloaded once and run with MLX on Apple silicon.',
    models: ['Apple', 'Llama', 'Qwen', 'Gemma', 'Mistral', 'Phi', 'DeepSeek', 'SmolLM'], foot: 'Free, private, works offline' },
];

// Figures. Re-check before changing:
// 100+  the Setapp AI catalog listed 109 models on the author's Mac (docs/plans/2026-08-17-model-pins-design.md).
// 3     places models run: Setapp AI+, your own key, on-device (ModelSource.swift: setapp, apiKey, local + appleFoundation).
// 7     built-in personas (Personas.swift builtIns; the sidebar badge shows 7).
// 0     first-party servers: no backend, no analytics (docs/legal/AnyChat-Data-Processing-Audit.md §1, §5).
export const stats = [
  { n: 100, suffix: '+', label: 'models through Setapp AI, from OpenAI, Anthropic, Google and more' },
  { n: 3, suffix: '', label: 'places a model can run: Setapp, your own key, your Mac' },
  { n: 7, suffix: '', label: 'built-in personas, every one editable' },
  { n: 0, suffix: '', label: 'AnyChat servers. Conversations live on your Mac' },
];

export const features = [
  { icon: 'stack', title: 'One transcript, any model', line: 'Switch models mid-conversation without losing context.',
    more: ['The model picker groups models by where they run.', 'Pin the ones you use; explore the rest with ⌘E.', 'A context pill shows how much of the prompt window is left.'] },
  { icon: 'compare', title: 'Same question, two models', line: 'Ask another model the same thing and compare side by side.',
    more: ['On your Mac next to the cloud, or any two models.', 'Keep the answer you prefer and carry on from it.', 'When it would bill your own key, the cost is shown first.'] },
  { icon: 'persona', title: 'Personas', line: 'Reusable system prompts, snapshotted per conversation.',
    more: ['Seven built in, from Code Reviewer to Socratic Tutor. Edit any of them.', 'A persona can ask its setup questions in the chat before it starts.', 'Give a persona PDFs to know; answers draw on their content.'] },
  { icon: 'doc', title: 'Chat with documents', line: 'Drop files in and answers cite the passages they came from.',
    more: ['Text is chunked and embedded on your Mac by default.', 'Attach with ⌘K or drag a file onto the window.'] },
  { icon: 'bolt', title: 'Skills', line: 'Reusable how-tos the model follows, and agents that plan and run steps.',
    more: ['Three ship with the app: MacPaw Tone of Voice, SCARF Feedback Framework, Meeting Recap.', 'Write your own in a folder; AnyChat reloads them.', 'Agent runs show their plan, each step and each result.'] },
  { icon: 'globe', title: 'Web search', line: 'Turn it on in the composer when an answer needs today’s facts.',
    more: ['Available with Setapp AI models.', 'Off by default; nothing is looked up unless you ask.'] },
  { icon: 'chart', title: 'Usage dashboard', line: 'Tokens, cost and a monthly budget, per model and provider.',
    more: ['Cost counts only your own API keys. Setapp and on-device models are not billed here.', 'Last 7 or 30 days, with a heatmap and top conversations.'] },
  { icon: 'menubar', title: 'Always a click away', line: 'A menu-bar Quick Chat opens over any app.',
    more: ['An unread-reply badge when an answer lands while you are elsewhere.', 'Two themes, Classic and Delight; light and dark follow the system.'] },
];

// Where your words go. Each row follows the data-processing audit (docs/legal/AnyChat-Data-Processing-Audit.md).
export const privacy = [
  { what: 'Conversations and attachments', where: 'Your Mac', note: 'Application Support, never our servers', state: 'g' },
  { what: 'API keys', where: 'macOS Keychain', note: 'not a config file', state: 'g' },
  { what: 'On-device models', where: 'Nothing leaves', note: 'Apple Intelligence and MLX answer locally', state: 'g' },
  { what: 'Cloud models', where: 'The provider you pick', note: 'Setapp AI, or your own provider, per message', state: 'o' },
  { what: 'Analytics', where: 'None', note: 'no tracking, no crash reporting', state: 'g' },
];

export const faqs = [
  { q: 'What is AnyChat?', a: 'A native Mac chat for every AI model: frontier models included with Setapp, your own API keys, and models that run on your Mac. One transcript, switch models whenever you like.' },
  { q: 'Do I need an API key?', a: 'No. With Setapp, frontier models are included and billed in Setapp AI coins. If you already have keys for OpenAI, Anthropic, Gemini, OpenRouter or an Ollama server, add them and AnyChat uses those too.' },
  { q: 'Why does Try Free open Setapp?', a: 'AnyChat ships through Setapp, MacPaw’s app platform. The button takes you to Setapp sign-up; once Setapp is on your Mac, AnyChat is one click away and the same account holds your AI coins.' },
  { q: 'Can it work offline?', a: 'Yes, with on-device models: Apple Intelligence on a Mac that supports it, or open models you download once and run locally with MLX on Apple silicon.' },
  { q: 'Where are my conversations stored?', a: 'On your Mac. There is no AnyChat server. Messages go off your Mac only to the AI provider you choose for that message, and API keys live in the macOS Keychain.' },
  { q: 'Can I compare models?', a: 'Yes. Under any reply, ask another model the same thing and both answers appear side by side. Keep the one you prefer and carry on.' },
  { q: 'What does it cost?', a: 'Setapp and on-device models are not billed by the app. If you use your own API keys, your provider bills you, and the Usage dashboard shows tokens, cost and the monthly budget you set.' },
  { q: 'What do I need to run it?', a: 'A Mac running macOS 15 Sequoia or later. Apple Intelligence models need macOS 26 and a supported Mac; local MLX models need Apple silicon.' },
];

// Questions typed into the closing banner's pill, one after another.
export const closingPrompts = [
  'Rewrite this in a friendlier tone',
  'Compare these two contracts for me',
  'What does this error mean?',
  'Plan a three-day trip to Lisbon',
  'Summarize the PDF I just dropped in',
];

// ── Shared by /switchboard and /blueprint ─────────────────────────────────────
// One question, five models, each answering in its own register. Model ids are ones the app lists
// (claude-opus-4-6 and gpt-5 via Setapp; Gemini via your own key; Llama 3.2 3B from the curated MLX catalog;
// Apple Intelligence). The replies are written for the demo, not captured from the models.
export const dial = {
  question: 'Rewrite this in a friendlier tone',
  models: [
    { id: 'claude-opus-4-6', short: 'Claude', where: 'Setapp AI+', text: 'Hey team, quick heads-up: the report slipped a day. Could you send yours by Friday? Thanks for bearing with me.' },
    { id: 'gpt-5', short: 'GPT', where: 'Setapp AI+', text: 'Hi everyone! Small delay on the report, so if you could send yours by Friday that would be great. Thank you!' },
    { id: 'gemini-2.5-pro', short: 'Gemini', where: 'your key', text: 'Hi team, the report is running a day behind. Please share yours by Friday. Appreciate it!' },
    { id: 'llama-3.2-3b', short: 'Llama', where: 'on your Mac', text: 'Hi all, the report is a day late. Please send it by Friday. Thank you.' },
    { id: 'Apple Intelligence', short: 'Apple', where: 'on your Mac', text: 'Hi team, the report is a day late. Could you send yours by Friday? Thanks!' },
  ],
};

// ── /blueprint only ───────────────────────────────────────────────────────────
// The build: one AnyChat exchange assembled on scroll, from a question to an answer that stays on your Mac.
export const build = [
  { title: 'A question.', text: 'Type it once, or drop in a file. ⌘↩ sends it.' },
  { title: 'A model.', text: 'Pick one from the picker, grouped by where it runs. Pin the ones you use; ⌘E explores the rest.' },
  { title: 'A route.', text: 'Setapp AI+, your own key, or your Mac. Your words go only where you send them.' },
  { title: 'An answer.', text: 'It streams in. Switch models mid-conversation and the context comes along.' },
  { title: 'A second opinion.', text: 'Ask another model the same thing, side by side. Keep the answer you prefer.' },
  { title: 'Stays here.', text: 'History lives on your Mac, keys in the Keychain. Nothing reaches an AnyChat server, because there isn’t one.' },
];

export const principles = [
  { title: 'No keys to paste.', text: 'Frontier models come with Setapp. Bring your own keys only if you want to.' },
  { title: 'No single vendor.', text: 'OpenAI, Anthropic, Google and more in the cloud, plus open models on your Mac.' },
  { title: 'No server of ours.', text: 'Conversations live on your Mac. No analytics, no tracking, no AnyChat backend.' },
  { title: 'Made for the Mac.', text: 'Native SwiftUI, a menu-bar Quick Chat, keyboard shortcuts throughout.' },
];

// Real captures, shown large (after the "selected work" pattern). Retake before launch: see README.
export const inside = [
  { tag: 'Chats', title: 'Ask, then go further.', text: 'Personas, skills and web search sit in the composer. Agent skills show their plan, each step and each result.', chips: ['Personas', 'Skills', 'Web Search', 'Agent plan'], src: '/assets/shots/chat-agent.png', alt: 'AnyChat with the conversation list, a reply with a four-step agent plan, and the composer with Skills, Persona and model controls' },
  { tag: 'Compare', title: 'Same question, two models.', text: 'On your Mac next to the cloud. Keep this one, or switch to that one, and carry on from there.', chips: ['On your Mac', 'Cloud', 'Keep this one'], src: '/assets/shots/compare.png', alt: 'The Same question, two models panel: an on-device model on the left, a cloud model on the right' },
];
