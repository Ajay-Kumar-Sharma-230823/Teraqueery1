import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './landing.css';

const stations = {
  Maitri: { title: 'MAITRI STATION', mapLabel: 'MAITRI', region: 'Antarctica', coords: 'Schirmacher Oasis · Antarctic region', marker: ['54%', '44%'], access: 'METADATA ONLY', source: 'NCPOR · prototype record', counts: [['12', 'Expeditions'], ['38', 'Research records'], ['16', 'Datasets'], ['24', 'Publications'], ['86', 'Media assets']] },
  Bharati: { title: 'BHARATI STATION', mapLabel: 'BHARATI', region: 'Antarctica', coords: 'Larsemann Hills · Antarctic region', marker: ['68%', '57%'], access: 'METADATA ONLY', source: 'NCPOR · prototype record', counts: [['08', 'Expeditions'], ['27', 'Research records'], ['11', 'Datasets'], ['18', 'Publications'], ['42', 'Media assets']] },
  Himadri: { title: 'HIMADRI STATION', mapLabel: 'HIMADRI', region: 'Arctic', coords: 'Arctic research station · demonstration record', marker: ['37%', '42%'], access: 'METADATA ONLY', source: 'NCPOR · prototype record', counts: [['06', 'Expeditions'], ['21', 'Research records'], ['09', 'Datasets'], ['14', 'Publications'], ['31', 'Media assets']] },
  'Arctic transect': { title: 'ARCTIC OCEAN TRANSECT', mapLabel: 'ARCTIC TRANSECT', region: 'Arctic', coords: 'Illustrative ocean sector · Arctic', marker: ['65%', '61%'], access: 'RESTRICTED', source: 'Prototype dataset · not a live source', counts: [['04', 'Expeditions'], ['18', 'Research records'], ['07', 'Datasets'], ['11', 'Publications'], ['26', 'Media assets']] },
  'Himalaya transect': { title: 'HIMALAYA FIELD TRANSECT', mapLabel: 'FIELD TRANSECT', region: 'Himalaya', coords: 'Illustrative high-altitude zone · Himalaya', marker: ['47%', '43%'], access: 'METADATA ONLY', source: 'ESSDP · prototype record', counts: [['05', 'Expeditions'], ['16', 'Research records'], ['08', 'Datasets'], ['10', 'Publications'], ['19', 'Media assets']] },
  'Himalaya glacier site': { title: 'GLACIER OBSERVATION ZONE', mapLabel: 'GLACIER ZONE', region: 'Himalaya', coords: 'Illustrative high-altitude zone · Himalaya', marker: ['66%', '60%'], access: 'RESTRICTED', source: 'Prototype dataset · not a live source', counts: [['03', 'Expeditions'], ['12', 'Research records'], ['05', 'Datasets'], ['08', 'Publications'], ['15', 'Media assets']] },
  'Southern Ocean transect': { title: 'SOUTHERN OCEAN TRANSECT', mapLabel: 'OCEAN TRANSECT', region: 'Southern Ocean', coords: 'Illustrative ocean sector · Southern Ocean', marker: ['40%', '51%'], access: 'METADATA ONLY', source: 'NCPOR · prototype record', counts: [['07', 'Expeditions'], ['23', 'Research records'], ['12', 'Datasets'], ['13', 'Publications'], ['28', 'Media assets']] },
  'Ocean sampling zone': { title: 'OCEAN SAMPLING ZONE', mapLabel: 'SAMPLING ZONE', region: 'Southern Ocean', coords: 'Illustrative ocean sector · Southern Ocean', marker: ['69%', '44%'], access: 'RESTRICTED', source: 'Prototype dataset · not a live source', counts: [['04', 'Expeditions'], ['15', 'Research records'], ['08', 'Datasets'], ['09', 'Publications'], ['20', 'Media assets']] },
};

const regionSites = {
  Antarctica: ['Maitri', 'Bharati'],
  Arctic: ['Himadri', 'Arctic transect'],
  Himalaya: ['Himalaya transect', 'Himalaya glacier site'],
  'Southern Ocean': ['Southern Ocean transect', 'Ocean sampling zone'],
};

const regionCoordinates = {
  Antarctica: '60° S — 90° S',
  Arctic: '60° N — 90° N',
  Himalaya: 'HIGH-ALTITUDE FIELD ZONES',
  'Southern Ocean': 'POLAR OCEAN SECTORS',
};

const features = [
  { id: 'repository', no: '01', title: 'Polar Knowledge Repository', purpose: 'Find trusted polar science across formats and collections.', icon: '⌕', visual: 'repository', capabilities: ['Research papers and expedition reports', 'Datasets and publications in context', 'Curated records with clear provenance', 'A single path into trusted knowledge'], why: 'A connected entry point makes research easier to discover and reuse.', tech: 'Metadata · Federated discovery · Provenance' },
  { id: 'graph', no: '02', title: 'Polar Knowledge Graph', purpose: 'Follow the people, places and research behind each discovery.', icon: '⌘', visual: 'graph', capabilities: ['Connects research records', 'Links datasets with publications', 'Connects expeditions, scientists and locations', 'Makes related knowledge discoverable'], why: 'People can follow the scientific story across connected resources instead of isolated records.', tech: 'Knowledge graph · Metadata · Semantic search' },
  { id: 'explorer', no: '03', title: 'Interactive Polar Explorer', purpose: 'Explore polar places through linked research and media.', icon: '◎', visual: 'map', capabilities: ['Browse stations and field locations', 'Filter by research, expedition or media', 'Open connected station records', 'Keep place and science in view together'], why: 'A geographic view gives research a human and environmental context.', tech: 'Geospatial records · Map layers · Linked data' },
  { id: 'copilot', no: '04', title: 'Source-Grounded Polar Copilot', purpose: 'Ask questions and receive answers grounded in approved research.', icon: '◉', visual: 'copilot', capabilities: ['Answers grounded in approved sources', 'Citation-backed responses', 'Repository-aware retrieval', 'Human-reviewed knowledge'], why: 'Every answer can be traced to evidence and reviewed before wider use.', tech: 'Retrieval · Citations · Human review' },
  { id: 'education', no: '05', title: 'Smart Education Hub', purpose: 'Bring authentic polar science into learning experiences.', icon: '✳', visual: 'education', capabilities: ['Student learning paths', 'Teacher lesson resources', 'Activities linked to observations', 'Age-aware explanations and checks'], why: 'Learners meet polar research through questions, evidence and activities.', tech: 'Learning design · Research links · Adaptation' },
  { id: 'lab', no: '06', title: 'Polar Data Lab', purpose: 'Explore scientific observations through simple visual analysis.', icon: '⌁', visual: 'lab', capabilities: ['Explore observation series', 'Compare variables and stations', 'Surface patterns for discussion', 'Link back to source records'], why: 'Students can work with evidence, not only read about scientific results.', tech: 'Scientific records · Visualization · Data literacy' },
  { id: 'reach', no: '07', title: 'Research-to-Reach', purpose: 'Adapt one trusted source for different audiences.', icon: '↗', visual: 'reach', capabilities: ['Select an audience and format', 'Create a source-linked first draft', 'Preserve scientific context', 'Route content for expert review'], why: 'Outreach teams can shape clear communications while keeping evidence visible.', tech: 'Audience adaptation · Provenance · Review workflow' },
  { id: 'media', no: '08', title: 'Media & Outreach Studio', purpose: 'Prepare reviewed media packages from polar research.', icon: '▧', visual: 'media', capabilities: ['Captions and explainers', 'Infographic and video outlines', 'Source notes for each asset', 'Review status before release'], why: 'A shared studio makes it easier to communicate science with care and context.', tech: 'Media metadata · Content design · Approval trail' },
];

const sourceExperiences = {
  Research: { label: 'RESEARCH', items: ['Dataset', 'Publication', 'Researcher', 'Location'], note: 'Keep the report connected to the evidence and people behind it.' },
  Education: { label: 'EDUCATION', items: ['Classroom explanation', 'Lesson plan', 'Quiz', 'Data activity'], note: 'Turn the same science into a guided learning journey.' },
  'Public knowledge': { label: 'PUBLIC KNOWLEDGE', items: ['Plain-language summary', 'Frequently asked questions', 'Glossary'], note: 'Make a complex topic approachable without losing its context.' },
  Media: { label: 'MEDIA', items: ['Caption', 'Infographic', 'Video script', 'Social post'], note: 'Give communicators a clear source and an accurate starting point.' },
  Outreach: { label: 'OUTREACH', items: ['Approved communication package', 'Source note', 'Review trail'], note: 'Route public-facing material through scientific and outreach review.' },
};

const audiences = {
  Student: { title: 'POLAR SCIENCE, MADE EXPLORABLE', intro: 'Learn through real research and evidence.', items: ['Interactive lessons', 'Real scientific observations', 'Short quizzes', 'Visual explanations', 'Polar careers'] },
  Teacher: { title: 'RESEARCH FOR THE CLASSROOM', intro: 'Build a lesson around authentic polar science.', items: ['Lesson plans', 'Worksheets', 'Discussion questions', 'Data activities', 'Classroom resources'] },
  Researcher: { title: 'A CONNECTED RESEARCH VIEW', intro: 'Follow records across the research lifecycle.', items: ['Datasets', 'Publications', 'Research connections', 'Metadata', 'Scientific records'] },
  Public: { title: 'DISCOVER THE POLAR STORY', intro: 'Explore clear, source-linked public knowledge.', items: ['Stories', 'Explainers', 'Polar events', 'Media', 'FAQs'] },
};

const audienceJourneys = {
  Student: ['OBSERVE', 'QUESTION', 'EXPLORE', 'LEARN'],
  Teacher: ['PLAN', 'INVESTIGATE', 'TEACH', 'ASSESS'],
  Researcher: ['RECORD', 'CONNECT', 'ANALYZE', 'SHARE'],
  Public: ['DISCOVER', 'UNDERSTAND', 'EXPLORE', 'SHARE'],
};

const studioCopy = {
  Researcher: ['Research context and linked observations', 'Research brief · source-linked'],
  Student: ['Understanding Antarctic temperature variation', 'Student explainer · learning level'],
  Teacher: ['A classroom activity on polar temperature patterns', 'Lesson outline · classroom-ready draft'],
  Public: ['Why Antarctic temperatures matter', 'Plain-language summary · sources attached'],
  Media: ['A changing Antarctic atmosphere, explained with evidence', 'Caption · infographic outline · 30-second script'],
};

const processSteps = [
  ['01', 'INGEST', 'Research, reports, datasets, publications and media enter the knowledge layer.', 'Sources are brought together with their original metadata and institutional context.'],
  ['02', 'UNDERSTAND', 'Metadata extraction, classification and processing.', 'Records are described consistently so they can be searched and interpreted.'],
  ['03', 'CONNECT', 'Researchers, expeditions, locations, datasets and publications become linked.', 'Relationships reveal where evidence came from and what other knowledge it supports.'],
  ['04', 'TRANSFORM', 'Scientific content is adapted for researchers, students, teachers and the public.', 'Audience formats are prepared from the same trusted source, with the context retained.'],
  ['05', 'REVIEW & DISSEMINATE', 'Scientific and outreach reviewers verify content before publication.', 'Drafts move through a visible approval path before they are shared.'],
];

const reviewSteps = [
  { title: 'SOURCE', detail: 'Verified record', status: 'Source linked', owner: 'Repository steward', role: 'Confirms provenance and metadata.' },
  { title: 'AI DRAFT', detail: 'Draft generated', status: 'Pending review', owner: 'Teraquerry assistant', role: 'Prepares a draft and keeps the source attached.' },
  { title: 'SCIENTIFIC REVIEW', detail: 'Research review', status: 'In progress', owner: 'Subject-matter scientist', role: 'Checks claims against the underlying evidence.' },
  { title: 'OUTREACH REVIEW', detail: 'Audience review', status: 'Queued', owner: 'Science communicator', role: 'Checks clarity, audience fit and context.' },
  { title: 'APPROVED', detail: 'Final check', status: 'Not started', owner: 'Authorised approver', role: 'Confirms the required reviews are complete.' },
  { title: 'PUBLISHED', detail: 'Shared output', status: 'Locked until approval', owner: 'Repository publisher', role: 'Releases the approved version with its source trail.' },
];

const impactItems = [
  ['RESEARCH', 'Make scientific knowledge easier to discover and connect.', 'Researchers can move from a publication to related datasets, people, expeditions and places.'],
  ['EDUCATION', 'Bring real polar research and datasets into learning.', 'Students and teachers can explore real observations through guided explanations and activities.'],
  ['OUTREACH', 'Reduce the effort needed to turn science into public communication.', 'Teams can start from a trusted source and prepare audience-ready formats with review built in.'],
  ['TRUST', 'Keep AI-generated knowledge tied to approved sources and expert review.', 'Source links, reviewer decisions and approval status remain visible throughout the journey.'],
];

const outcomes = ['Research record', 'Dataset discovery', 'Public summary', 'Student explanation', 'Teacher lesson', 'Quiz', 'FAQ', 'Infographic', 'Social post', 'Video script'];
const outcomeDescriptions = [
  'A structured sample record that keeps the expedition, place, contributors and source metadata together.',
  'A prototype dataset card showing its science domain, year, institution and access status.',
  'A concise public explanation prepared from the expedition report, with the source kept attached.',
  'A plain-language explanation that introduces the observation without changing its evidence.',
  'A classroom outline with learning goals, an observation activity and source material.',
  'A short knowledge check with answers linked back to the source record.',
  'A set of common questions with evidence notes for review.',
  'A visual outline that keeps labels, captions and source credit together.',
  'A short social draft with a source note and review status.',
  'A spoken script outline with scene notes, source credit and review status.',
];
const graphEdges = [['researcher', 'institution'], ['institution', 'expedition'], ['expedition', 'station'], ['expedition', 'dataset'], ['station', 'dataset'], ['dataset', 'publication'], ['publication', 'media'], ['media', 'education']];
const graphEntitySeeds = [
  { id: 'researcher', kind: 'RESEARCHER', name: 'Polar atmospheric science team', description: 'A sample research group linked to this demonstration journey.', year: '2024', institution: 'NCPOR · demo connection', access: 'METADATA ONLY', source: 'NCPOR prototype record', connected: ['Expedition report', 'Observation series'] },
  { id: 'institution', kind: 'INSTITUTION', name: 'NCPOR', description: 'Institutional context shown as a prototype connection.', year: '—', institution: 'Canonical source', access: 'PUBLIC', source: 'NCPOR', connected: ['Expedition record', 'Maitri Station'] },
  { id: 'expedition', kind: 'EXPEDITION', name: 'Indian Antarctic Expedition', description: 'Illustrative expedition record connecting people, field locations and sample outputs.', year: '2024', institution: 'NCPOR · demo connection', access: 'METADATA ONLY', source: 'NCPOR prototype record', connected: ['Maitri Station', 'Atmospheric Observation Series'] },
  { id: 'station', kind: 'STATION', name: 'Maitri Station', description: 'Selected field location in the illustrative polar knowledge graph.', year: '—', institution: 'NCPOR · demo connection', access: 'METADATA ONLY', source: 'NCPOR prototype record', connected: ['Expedition report', 'Observation series'] },
  { id: 'dataset', kind: 'DATASET', name: 'Atmospheric Observation Series', description: 'Prototype dataset card; values and relationships are illustrative.', year: '2024', institution: 'NPDC · demo connection', access: 'METADATA ONLY', source: 'NPDC prototype record', connected: ['Maitri Station', 'Antarctic Atmospheric Research'] },
  { id: 'publication', kind: 'PUBLICATION', name: 'Antarctic Atmospheric Research', description: 'Sample publication record linked to the demonstration dataset.', year: '2023', institution: 'Scientific literature · demo connection', access: 'PUBLIC', source: 'Publication index prototype', connected: ['Observation series', 'Field note'] },
  { id: 'media', kind: 'MEDIA', name: 'Polar field notes', description: 'Illustrative media record with its place and research context attached.', year: '2024', institution: 'NCPOR · demo connection', access: 'PUBLIC', source: 'Media index prototype', connected: ['Antarctic Atmospheric Research', 'Learning activity'] },
  { id: 'education', kind: 'EDUCATION', name: 'Polar observations · learning activity', description: 'Sample education output linked to a source and its review trail.', year: '2024', institution: 'Teraquerry · demo experience', access: 'PUBLIC', source: 'Teraquerry prototype', connected: ['Polar field notes', 'Observation series'] },
];
const connectedSources = [
  { name: 'NPDC', description: 'Research datasets', status: 'DEMO INDEX', canonical: 'National Polar Data Centre', access: 'Metadata only', source: 'Prototype view · original portal available', url: 'https://npdc.ncpor.res.in/' },
  { name: 'NCPOR', description: 'Expeditions and polar research', status: 'CANONICAL SOURCE', canonical: 'National Centre for Polar and Ocean Research', access: 'Open original source', source: 'Institutional website', url: 'https://www.ncpor.res.in/' },
  { name: 'ESSDP', description: 'Earth-system data', status: 'DEMO CONNECTION', canonical: 'Earth-system science data source', access: 'Metadata only', source: 'Source endpoint not configured' },
  { name: 'Publications', description: 'Scientific literature', status: 'INDEXED SAMPLE', canonical: 'Publisher or institutional record', access: 'Varies by source', source: 'Canonical link retained by its source' },
  { name: 'Media', description: 'Images and videos', status: 'DEMO INDEX', canonical: 'Institutional media record', access: 'Varies by source', source: 'Original asset remains external' },
];
const reachTranslations = {
  Hindi: { Researcher: 'तकनीकी शोध संक्षेप', Student: 'अंटार्कटिका का तापमान — सरल व्याख्या', Teacher: 'ध्रुवीय तापमान पर कक्षा गतिविधि', Public: 'अंटार्कटिका का तापमान क्यों मायने रखता है', Media: 'ध्रुवीय वातावरण · वीडियो रूपरेखा' },
  Marathi: { Researcher: 'तांत्रिक संशोधन सारांश', Student: 'अंटार्क्टिक तापमान — सोपे स्पष्टीकरण', Teacher: 'ध्रुवीय तापमानावरील वर्ग कृती', Public: 'अंटार्क्टिक तापमान का महत्त्वाचे आहे', Media: 'ध्रुवीय वातावरण · व्हिडिओ आराखडा' },
  Bengali: { Researcher: 'গবেষণার প্রযুক্তিগত সারাংশ', Student: 'অ্যান্টার্কটিক তাপমাত্রা — সহজ ব্যাখ্যা', Teacher: 'মেরু তাপমাত্রা নিয়ে শ্রেণিকক্ষের কাজ', Public: 'অ্যান্টার্কটিক তাপমাত্রা কেন গুরুত্বপূর্ণ', Media: 'মেরু বায়ুমণ্ডল · ভিডিওর খসড়া' },
  Tamil: { Researcher: 'ஆய்வு தொழில்நுட்பச் சுருக்கம்', Student: 'அண்டார்டிக் வெப்பநிலை — எளிய விளக்கம்', Teacher: 'துருவ வெப்பநிலை வகுப்பறைச் செயல்பாடு', Public: 'அண்டார்டிக் வெப்பநிலை ஏன் முக்கியம்', Media: 'துருவ வளிமண்டலம் · காணொளி வரைவு' },
  Telugu: { Researcher: 'పరిశోధన సాంకేతిక సారాంశం', Student: 'అంటార్కిటిక్ ఉష్ణోగ్రత — సరళ వివరణ', Teacher: 'ధ్రువ ఉష్ణోగ్రత తరగతి కార్యకలాపం', Public: 'అంటార్కిటిక్ ఉష్ణోగ్రత ఎందుకు ముఖ్యం', Media: 'ధ్రువ వాతావరణం · వీడియో రూపురేఖ' },
};
const navItems = [['The Idea', '#idea'], ['Platform', '#platform'], ['Explorer', '#explorer'], ['Education', '#education'], ['Research → Reach', '#reach'], ['How It Works', '#how'], ['Impact', '#impact'], ['The Vision', '#final']];

function demoRecordsFor(region, selectedStation) {
  const stationIds = regionSites[region] || regionSites.Antarctica;
  const primary = stations[selectedStation]?.region === region ? selectedStation : stationIds[0];
  const place = stations[primary].title.replace(' STATION', '');
  const expedition = region === 'Antarctica' ? 'Indian Antarctic Expedition' : `${region} field campaign`;
  const topic = region === 'Antarctica' ? 'Antarctic atmospheric' : `${region} environmental`;
  return [
    { kind: 'Dataset', title: region === 'Antarctica' ? 'Atmospheric Observation Series' : `${region} observation series`, detail: 'Prototype dataset entry with source metadata and linked sample records.', region, stationId: primary, year: '2024', researcher: 'Polar atmospheric science team', institution: 'NPDC', domain: 'Atmospheric science', access: 'METADATA ONLY', source: 'NPDC · prototype record' },
    { kind: 'Publication', title: region === 'Antarctica' ? 'Antarctic Atmospheric Research' : `${region} research synthesis`, detail: 'Sample publication entry; follow the canonical source for the original record.', region, stationId: primary, year: '2023', researcher: 'Polar atmospheric science team', institution: 'NCPOR', domain: 'Atmospheric science', access: 'PUBLIC', source: 'Publication index · demo record' },
    { kind: 'Expedition', title: expedition, detail: 'Demonstration expedition record connecting a field program to its sample location.', region, stationId: primary, year: '2024', researcher: 'Polar field team', institution: 'NCPOR', domain: 'Field research', access: 'METADATA ONLY', source: 'NCPOR · prototype record' },
    { kind: 'Station', title: stations[primary].title, detail: 'Sample location record with connected research and source context.', region, stationId: primary, year: '—', researcher: 'Polar field team', institution: 'NCPOR', domain: 'Field research', access: stations[primary].access, source: stations[primary].source },
    { kind: 'Researcher', title: 'Polar atmospheric science team', detail: 'Illustrative team entity; no individual researcher profile is claimed.', region, stationId: primary, year: '2024', researcher: 'Polar atmospheric science team', institution: 'NCPOR', domain: 'Atmospheric science', access: 'METADATA ONLY', source: 'NCPOR · prototype record' },
    { kind: 'Research', title: `${topic} observations · research brief`, detail: 'A concise research view with connected sample records and source metadata.', region, stationId: primary, year: '2024', researcher: 'Polar atmospheric science team', institution: 'NCPOR', domain: 'Atmospheric science', access: 'PUBLIC', source: 'Research index · demo record' },
    { kind: 'Media', title: `${place} · field notes and images`, detail: 'Illustrative media record with place, creator and research context fields.', region, stationId: primary, year: '2024', researcher: 'Polar field team', institution: 'NCPOR', domain: 'Field documentation', access: 'PUBLIC', source: 'Media index · demo record' },
    { kind: 'Education', title: `${region} observations · classroom activity`, detail: 'Sample learning resource linked to the same observation source.', region, stationId: primary, year: '2024', researcher: 'Teraquerry education team', institution: 'Teraquerry', domain: 'Education', access: 'PUBLIC', source: 'Teraquerry · demo experience' },
    { kind: 'Dataset', title: `${region} sea-ice sample series`, detail: 'Illustrative sample record; measurements are not live scientific data.', region, stationId: stationIds[1], year: '2022', researcher: 'Sea-ice field team', institution: 'ESSDP', domain: 'Sea ice', access: 'RESTRICTED', source: 'ESSDP · prototype record' },
  ];
}

function Eyebrow({ children, light = false }) { return <p className={`eyebrow${light ? ' eyebrow-light' : ''}`}><span />{children}</p>; }
function Arrow({ children = '↗' }) { return <span className="arrow-mark" aria-hidden="true">{children}</span>; }

function CountNumber({ value }) {
  const target = Number.parseInt(value, 10) || 0;
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setCount(target); return undefined; }
    let frame;
    let start;
    const tick = time => {
      if (start === undefined) start = time;
      const progress = Math.min((time - start) / 640, 1);
      setCount(Math.round(target * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);
  return <>{String(count).padStart(value.length, '0')}</>;
}

function graphEntitiesFor(region, stationId) {
  const place = stations[stationId] || stations.Maitri;
  const inAntarctica = region === 'Antarctica';
  return graphEntitySeeds.map(entity => {
    if (entity.id === 'station') return { ...entity, name: place.title, description: `${place.coords}. This sample location is part of the ${region} demonstration view.`, source: place.source, access: place.access };
    if (entity.id === 'expedition' && !inAntarctica) return { ...entity, name: `${region} field campaign`, description: `Illustrative field campaign record connected to ${place.title}.`, source: 'Prototype record · not a live source' };
    if (entity.id === 'dataset' && !inAntarctica) return { ...entity, name: `${region} observation series`, description: `Prototype dataset entry for ${region}; values and relationships are illustrative.`, source: 'Prototype dataset · not a live source' };
    if (entity.id === 'publication' && !inAntarctica) return { ...entity, name: `${region} research synthesis`, description: `Sample publication record connected to the ${region} demonstration view.`, source: 'Publication index · demo record' };
    return entity;
  });
}

const graphNodePositions = {
  researcher: [12, 14], institution: [50, 14], expedition: [31, 40], station: [12, 70], dataset: [50, 70], publication: [86, 40], media: [86, 70], education: [50, 93],
};

function KnowledgeGraph({ nodes, activeId, onSelect }) {
  return <div className="knowledge-graph" aria-label="Interactive polar knowledge graph">
    <div className="knowledge-graph-top"><span>CONNECTED RECORDS · DEMONSTRATION DATA</span><span>SELECT A NODE TO INSPECT</span></div>
    <div className="knowledge-graph-scroll"><div className="knowledge-graph-canvas">
      <svg viewBox="0 0 760 470" preserveAspectRatio="none" aria-hidden="true">
        <path d="M145 66 344 66M380 92 250 170M230 205 126 300M255 205 370 300M122 330 350 330M415 307 610 205M640 230 640 300M610 342 410 420" />
        <path d="M230 205 370 300M415 330 610 205" className="graph-edge-secondary" />
      </svg>
      {nodes.map(node => { const [left, top] = graphNodePositions[node.id]; return <button type="button" key={node.id} className={`knowledge-graph-node${activeId === node.id ? ' is-active' : ''}`} style={{ left: `${left}%`, top: `${top}%` }} onClick={() => onSelect(node.id)} aria-pressed={activeId === node.id}>
        <small>{node.kind}</small><strong>{node.name}</strong>
      </button>; })}
    </div></div>
    <p className="knowledge-graph-foot">Prototype relationships · source links are illustrative and records remain with their original institutions.</p>
  </div>;
}

function GraphInspector({ node, onViewResearch }) {
  return <div className="graph-inspector" aria-live="polite">
    <div className="station-card-label"><span>SELECTED KNOWLEDGE NODE</span><span className="location-dot" /></div>
    <small className="graph-inspector-kind">{node.kind}</small><h3>{node.name}</h3><p className="station-coords">{node.description}</p>
    <div className="graph-facts"><div><span>YEAR</span><strong>{node.year}</strong></div><div><span>INSTITUTION</span><strong>{node.institution}</strong></div><div><span>ACCESS</span><strong>{node.access}</strong></div><div><span>SOURCE</span><strong>{node.source}</strong></div></div>
    <div className="graph-connections"><span>CONNECTED RECORDS</span><div>{node.connected.map(item => <i key={item}>{item}</i>)}</div></div>
    <div className="graph-inspector-actions"><a href="#ecosystem">Source details <Arrow>↗</Arrow></a><button type="button" onClick={onViewResearch}>View connected research <Arrow>↗</Arrow></button></div>
    <small className="graph-demo-note">Sample metadata only · no live repository connection</small>
  </div>;
}

function PolarMap({ selectedStation, onSelect, small = false, region = 'Antarctica' }) {
  const sites = regionSites[region] || regionSites.Antarctica;
  return (
    <div className={`polar-map${small ? ' polar-map-small' : ''}`}>
      <div className="map-coordinate coord-top">{region.toUpperCase()} · SCHEMATIC DISCOVERY VIEW</div>
      <svg className={`map-art map-art-${region.toLowerCase().replaceAll(' ', '-')}`} viewBox="0 0 800 520" role="img" aria-label={`Illustrative schematic view of ${region} with sample location markers`}>
        <defs><pattern id="mapDots" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".8" fill="currentColor" opacity=".12" /></pattern></defs>
        <ellipse cx="400" cy="260" rx="315" ry="210" fill="none" stroke="currentColor" strokeOpacity=".18" strokeDasharray="3 8" />
        <ellipse cx="400" cy="260" rx="240" ry="155" fill="none" stroke="currentColor" strokeOpacity=".16" />
        <ellipse cx="400" cy="260" rx="155" ry="100" fill="none" stroke="currentColor" strokeOpacity=".13" />
        <path d="M367 107 402 95 438 108 465 133 508 137 529 158 570 170 592 197 581 222 601 244 577 266 562 293 530 310 506 339 478 349 456 375 428 384 410 407 389 393 364 400 343 377 313 366 303 340 274 329 266 302 241 285 248 258 226 237 240 210 232 185 259 165 278 142 312 143 333 120Z" fill="url(#mapDots)" stroke="currentColor" strokeWidth="2" strokeOpacity=".7" />
        <path d="M365 124 390 176 376 228 403 266 389 311 411 367M451 133 424 185 439 233 411 266 428 314 410 367M279 164 338 194 365 224M530 164 478 197 439 233M269 302 332 286 388 311M520 314 462 292 428 314" fill="none" stroke="currentColor" strokeOpacity=".18" strokeWidth="1" />
        <circle cx="400" cy="260" r="3" fill="currentColor" opacity=".7" />
        <text x="410" y="255" className="map-label">SOUTH POLE</text>
        <text x="450" y="431" className="map-label map-label-small">ANTARCTICA · SCHEMATIC</text>
        {region === 'Arctic' && <g className="regional-map-shape"><path d="M165 167 202 129 248 141 271 178 255 214 222 223 196 206ZM319 111 365 90 412 108 438 141 421 169 382 164 358 192 323 176ZM497 136 541 127 586 154 601 193 572 218 532 203 505 177ZM268 264 302 242 340 250 351 279 329 307 291 301ZM429 286 470 259 514 272 531 310 504 335 459 322Z"/><path d="M183 163 246 188M337 107 379 163 414 122M512 149 550 199M286 270 333 289M452 294 507 314"/><text x="358" y="248" className="map-label">POLAR OCEAN</text></g>}
        {region === 'Himalaya' && <g className="regional-map-shape"><path d="M103 347 169 314 220 326 264 278 310 306 358 222 397 271 438 189 478 256 522 218 560 289 614 256 698 346 698 382 103 382Z"/><path d="M130 360 216 340 296 329 358 255 397 293 438 222 478 277 527 246 570 306 630 283"/><text x="360" y="423" className="map-label">HIGH-ALTITUDE FIELD ZONE</text></g>}
        {region === 'Southern Ocean' && <g className="regional-map-shape"><path d="M120 260C193 177 300 155 400 161S611 185 680 259M119 281C194 361 302 383 400 378S611 355 681 282M164 260C224 206 311 195 400 199S569 213 636 259M164 281C224 334 311 344 400 341S569 328 636 282M228 260C278 230 340 226 400 228S526 237 574 260M228 281C278 310 340 315 400 313S526 304 574 281"/><text x="303" y="427" className="map-label">OCEAN OBSERVATION SECTORS</text></g>}
      </svg>
      {sites.map((site, index) => <button key={site} className={`map-station${index ? ' pin-bharati' : ' pin-maitri'}${selectedStation === site ? ' pin-active' : ''}`} style={{ left: stations[site].marker[0], top: stations[site].marker[1] }} onClick={() => onSelect(site)} aria-label={`Select ${stations[site].title}`}><i />{stations[site].mapLabel}</button>)}
      <div className="map-coordinate coord-bottom">{regionCoordinates[region]} <span>DEMO RECORDS</span></div>
    </div>
  );
}

function ExplorerPanel({ selectedStation, setSelectedStation, stationOpen, setStationOpen, compact = false, region = 'Antarctica', recordType = 'All records', setRecordType = () => {}, explorerView = 'map', setExplorerView = () => {} }) {
  const station = stations[selectedStation];
  const [activeRecord, setActiveRecord] = useState(null);
  const [query, setQuery] = useState('');
  const [advancedFiltersOpen, setAdvancedFiltersOpen] = useState(false);
  const [yearFilter, setYearFilter] = useState('All years');
  const [stationFilter, setStationFilter] = useState('All stations');
  const [researcherFilter, setResearcherFilter] = useState('All researchers');
  const [institutionFilter, setInstitutionFilter] = useState('All institutions');
  const [domainFilter, setDomainFilter] = useState('All science domains');
  const [selectedGraphId, setSelectedGraphId] = useState('station');
  useEffect(() => { setStationFilter('All stations'); setActiveRecord(null); }, [region]);
  const layers = [['Stations', 'All records'], ['Research', 'Research'], ['Expeditions', 'Expedition'], ['Media', 'Media']];
  const records = demoRecordsFor(region, selectedStation);
  const years = ['All years', ...new Set(records.map(record => record.year).filter(year => year !== '—'))];
  const graphNodes = graphEntitiesFor(region, selectedStation);
  const selectedGraphNode = graphNodes.find(node => node.id === selectedGraphId) || graphNodes.find(node => node.id === 'station');
  const queryTerms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const filteredRecords = records.filter(record => {
    const searchable = `${record.title} ${record.kind} ${record.detail} ${record.region} ${record.region === 'Antarctica' ? 'Antarctic' : ''} ${record.stationId} ${record.year} ${record.researcher} ${record.institution} ${record.domain} ${record.source}`.toLowerCase();
    const queryMatches = queryTerms.every(term => searchable.includes(term) || (term.endsWith('s') && searchable.includes(term.slice(0, -1))));
    return queryMatches && (recordType === 'All records' || record.kind.toLowerCase() === recordType.toLowerCase()) && (yearFilter === 'All years' || record.year === yearFilter) && (stationFilter === 'All stations' || record.stationId === stationFilter) && (researcherFilter === 'All researchers' || record.researcher === researcherFilter) && (institutionFilter === 'All institutions' || record.institution === institutionFilter) && (domainFilter === 'All science domains' || record.domain === domainFilter);
  });
  return (
    <div className={`explorer-board${compact ? ' explorer-board-compact' : ''}`}>
      <div className="explorer-toolbar"><div><span className="live-dot" /> KNOWLEDGE EXPLORER <small>DEMONSTRATION VIEW</small></div><span className="toolbar-right">{region.toUpperCase()} <i>⌕</i></span></div>
      {!compact && <form className="knowledge-search" onSubmit={event => event.preventDefault()}>
        <div className="knowledge-search-heading"><strong>Search Polar Knowledge</strong><span>Find connected research, datasets, expeditions, publications and people from one place.</span></div>
        <div className="knowledge-search-row"><label className="knowledge-search-input"><span aria-hidden="true">⌕</span><input type="search" aria-label="Search datasets, expeditions, researchers, publications and stations" placeholder="Search datasets, expeditions, researchers, publications, stations…" value={query} onChange={event => setQuery(event.target.value)} /></label><button className="knowledge-search-submit" type="submit">Search records <Arrow>↗</Arrow></button><button className="advanced-filter-toggle" type="button" aria-expanded={advancedFiltersOpen} onClick={() => setAdvancedFiltersOpen(!advancedFiltersOpen)}>{advancedFiltersOpen ? 'Hide filters' : 'More filters'} <Arrow>{advancedFiltersOpen ? '−' : '+'}</Arrow></button></div>
        <div className="search-suggestions"><span>TRY</span>{['Antarctic atmospheric observations', 'Maitri Station', 'Sea ice'].map(suggestion => <button type="button" key={suggestion} onClick={() => setQuery(suggestion)}>{suggestion}</button>)}</div>
        {advancedFiltersOpen && <div className="knowledge-advanced-filters"><label>YEAR<select value={yearFilter} onChange={event => setYearFilter(event.target.value)}>{years.map(year => <option key={year}>{year}</option>)}</select></label><label>STATION<select value={stationFilter} onChange={event => setStationFilter(event.target.value)}><option>All stations</option>{(regionSites[region] || regionSites.Antarctica).map(site => <option key={site} value={site}>{stations[site].title}</option>)}</select></label><label>RESEARCHER<select value={researcherFilter} onChange={event => setResearcherFilter(event.target.value)}>{['All researchers', ...new Set(records.map(record => record.researcher))].map(item => <option key={item}>{item}</option>)}</select></label><label>INSTITUTION<select value={institutionFilter} onChange={event => setInstitutionFilter(event.target.value)}>{['All institutions', ...new Set(records.map(record => record.institution))].map(item => <option key={item}>{item}</option>)}</select></label><label>SCIENCE DOMAIN<select value={domainFilter} onChange={event => setDomainFilter(event.target.value)}>{['All science domains', ...new Set(records.map(record => record.domain))].map(item => <option key={item}>{item}</option>)}</select></label></div>}
      </form>}
      <div className="explorer-main">
        <div className="explorer-map-column">
          <div className="map-controls"><span>MAP LAYERS</span>{layers.map(([label, value]) => <button type="button" className={recordType === value ? 'layer-selected' : ''} key={label} onClick={() => setRecordType(value)}>{label}</button>)}{!compact && <div className="explorer-view-toggle" role="tablist" aria-label="Choose explorer view"><button type="button" role="tab" aria-selected={explorerView === 'map'} className={explorerView === 'map' ? 'selected' : ''} onClick={() => setExplorerView('map')}>Map</button><button type="button" role="tab" aria-selected={explorerView === 'graph'} className={explorerView === 'graph' ? 'selected' : ''} onClick={() => setExplorerView('graph')}>Knowledge graph</button></div>}</div>
          {!compact && explorerView === 'graph' ? <KnowledgeGraph nodes={graphNodes} activeId={selectedGraphNode.id} onSelect={setSelectedGraphId} /> : <PolarMap selectedStation={selectedStation} onSelect={(name) => { setSelectedStation(name); setStationOpen(true); setActiveRecord(null); }} small={compact} region={region} />}
        </div>
        <aside className={`station-card${!compact && explorerView === 'graph' ? ' graph-inspector-card' : ''}`} aria-live="polite">
          {!compact && explorerView === 'graph' ? <GraphInspector node={selectedGraphNode} onViewResearch={() => { setExplorerView('map'); setRecordType('Research'); setYearFilter('All years'); setStationFilter('All stations'); setResearcherFilter('All researchers'); setInstitutionFilter('All institutions'); setDomainFilter('All science domains'); setActiveRecord(null); setStationOpen(false); setQuery(region === 'Antarctica' ? 'Antarctic atmospheric observations' : `${region} observations`); }} /> : <>
          <div className="station-card-label"><span>SELECTED FIELD LOCATION</span><span className="location-dot" /></div>
          <p className="station-region">{station.region}</p>
          <h3>{station.title}</h3>
          <p className="station-coords">{station.coords}</p>
          <div className="station-access"><span>ACCESS STATUS</span><strong>{station.access}</strong><small>{station.source}</small></div>
          <div className="station-counts">{station.counts.map(([value, label]) => <div key={label}><strong><CountNumber value={value} /></strong><span>{label}</span></div>)}</div>
          <div className="sample-label">SAMPLE COLLECTION · ILLUSTRATIVE COUNTS</div>
          <button className="station-open" onClick={() => setStationOpen(!stationOpen)}>{stationOpen ? 'Close station record' : 'Open station record'} <Arrow>{stationOpen ? '−' : '↗'}</Arrow></button>
          {stationOpen && <div className="station-record"><strong>{activeRecord?.title || `${station.title} · connected collection`}</strong><span>{activeRecord?.detail || 'Research, datasets, publications and media connected for demonstration.'}</span>{activeRecord && <div className="record-metadata"><span>YEAR · {activeRecord.year}</span><span>RESEARCHER · {activeRecord.researcher}</span><span>INSTITUTION · {activeRecord.institution}</span><span>ACCESS · {activeRecord.access}</span><span>SOURCE · {activeRecord.source}</span></div>}<a href="#ecosystem">View source details <Arrow>↗</Arrow></a></div>}
          </>}
        </aside>
      </div>
      <div className="explorer-foot"><span>{explorerView === 'graph' && !compact ? 'SELECT A NODE TO INSPECT ITS LINKS' : 'SELECT A MARKER TO EXPLORE A STATION'}</span><span>Illustrative interface · sample content</span></div>
      {!compact && <div className="explorer-results"><div className="explorer-results-head"><div><small>SEARCH RESULTS · {filteredRecords.length} PROTOTYPE RECORDS</small><strong>{recordType} · {region}</strong></div><span>Source links are illustrative · not live repository data</span></div><div className="explorer-result-list">{filteredRecords.length ? filteredRecords.map(record => <button type="button" className={activeRecord?.title === record.title ? 'record-selected' : ''} key={`${record.kind}-${record.title}`} onClick={() => { setActiveRecord(record); setSelectedStation(record.stationId); setStationOpen(true); }}><small>{record.kind} · {record.year} · {record.access}</small><strong>{record.title}</strong><span>{record.institution} · {record.domain}</span><em>Open connected record <Arrow>↗</Arrow></em></button>) : <div className="search-empty"><strong>No prototype records match these filters.</strong><span>Try a broader phrase or reset one of the advanced filters.</span><button type="button" onClick={() => { setQuery(''); setRecordType('All records'); setYearFilter('All years'); setStationFilter('All stations'); setResearcherFilter('All researchers'); setInstitutionFilter('All institutions'); setDomainFilter('All science domains'); }}>Clear search and filters</button></div>}</div></div>}
    </div>
  );
}

function DemoChart({ compare = false, variable = 'Temperature', station = 'Maitri', period = '2024–2025', anomaly = false }) {
  const [activeMonth, setActiveMonth] = useState(5);
  const series = {
    Temperature: { unit: '°C', values: [-17, -21, -27, -33, -39, -43, -41, -36, -30, -24, -20, -16] },
    'Wind speed': { unit: 'm/s', values: [12, 15, 14, 18, 20, 23, 21, 17, 16, 13, 11, 12] },
    'Sea ice': { unit: 'M km²', values: [7.8, 8.6, 10.2, 12.9, 15.1, 16.7, 16.2, 14.5, 12.1, 10.1, 8.4, 7.5] },
  }[variable] || { unit: '', values: [] };
  const yearOffset = period.startsWith('2023') ? -1.6 : period.startsWith('2019') ? 2.1 : 0;
  const stationOffset = station === 'Bharati' ? 1.2 : station === 'Maitri' ? 0 : station.includes('Arctic') ? 3.4 : station.includes('Himalaya') ? -2.2 : 1.8;
  const primary = series.values.map((value, index) => Number((value + stationOffset + yearOffset + Math.sin(index * .8) * .8).toFixed(1)));
  const secondary = primary.map((value, index) => Number((value + (index % 2 ? -2.4 : 2.1)).toFixed(1)));
  const allValues = [...primary, ...(compare ? secondary : [])];
  const low = Math.min(...allValues), high = Math.max(...allValues), pad = Math.max((high - low) * .12, 1);
  const min = low - pad, max = high + pad;
  const point = (value, index) => ({ x: 56 + index * 39.45, y: 170 - ((value - min) / (max - min)) * 122 });
  const pathFor = values => values.map((value, index) => { const { x, y } = point(value, index); return `${index ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`; }).join(' ');
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const activeValue = primary[activeMonth];
  return <div className="chart-plot">
    <svg className="demo-chart" viewBox="0 0 520 220" role="img" aria-label={`Illustrative ${variable.toLowerCase()} observations for ${station}, ${period}. Select a point to inspect its sample value.`}>
      {[0, 1, 2, 3].map(index => { const y = 48 + index * 40; const value = max - (max - min) * index / 3; return <g key={index}><line x1="55" y1={y} x2="490" y2={y} className="chart-gridline" /><text x="2" y={y + 3} className="chart-axis">{value.toFixed(variable === 'Sea ice' ? 1 : 0)}</text></g>; })}
      {[56, 135, 214, 293, 372, 451].map((x, index) => <g key={x}><line x1={x} y1="42" x2={x} y2="174" className="chart-gridline chart-grid-vertical" /><text x={x} y="199" textAnchor="middle" className="chart-axis">{months[index * 2]}</text></g>)}
      {compare && <path d={pathFor(secondary)} className="chart-line chart-line-alt" />}
      <path d={pathFor(primary)} className="chart-line" />
      {primary.map((value, index) => { const { x, y } = point(value, index); return <circle key={months[index]} cx={x} cy={y} r={activeMonth === index ? 6 : 3.5} className={`chart-point${anomaly && index === 6 ? ' chart-point-anomaly' : ''}${activeMonth === index ? ' chart-point-active' : ''}`} tabIndex="0" role="button" aria-label={`${months[index]} sample value ${value} ${series.unit}`} onClick={() => setActiveMonth(index)} onFocus={() => setActiveMonth(index)} onMouseEnter={() => setActiveMonth(index)}><title>{months[index]} · {value} {series.unit}</title></circle>; })}
    </svg>
    <div className="chart-reading"><span><i /> {months[activeMonth]} SAMPLE READING</span><strong>{activeValue} <small>{series.unit}</small></strong><em>{station} · {period}</em></div>
    {anomaly && <div className="chart-anomaly-flag">REVIEW FLAG · JUL</div>}
  </div>;
}

const copilotSuggestions = ['What research is connected to Maitri Station?', 'Which datasets are linked to this expedition?', 'Explain Antarctic atmospheric observations for a student.'];

function CopilotDemo() {
  const [question, setQuestion] = useState('');
  const [submittedQuestion, setSubmittedQuestion] = useState('');
  const [traceOpen, setTraceOpen] = useState(false);
  const answer = /student|explain/i.test(submittedQuestion)
    ? 'In this prototype, Antarctic atmospheric observations are sample records that help learners explore how researchers study polar air and weather. The example is linked to an expedition report and a dataset record; it does not describe live measurements.'
    : /dataset|data/i.test(submittedQuestion)
      ? 'The demonstration connects an expedition report to an Atmospheric Observation Series dataset entry and a related publication. The records are examples for exploring provenance; no live repository data is queried.'
      : 'The prototype links Maitri Station to an illustrative Indian Antarctic Expedition record, an Atmospheric Observation Series dataset entry and a sample publication. These connections demonstrate discovery and do not claim live repository coverage.';
  const submitQuestion = value => { const next = value.trim(); if (!next) return; setQuestion(next); setSubmittedQuestion(next); setTraceOpen(false); };
  return <div className="copilot-demo">
    <div className="copilot-heading"><span>ASK TERAQUERRY</span><small>LOCAL DEMONSTRATION · NO LIVE AI SERVICE</small></div>
    <form className="copilot-form" onSubmit={event => { event.preventDefault(); submitQuestion(question); }}><label className="visually-hidden" htmlFor="copilot-question">Ask about polar research, datasets, expeditions or publications</label><input id="copilot-question" value={question} onChange={event => setQuestion(event.target.value)} placeholder="Ask about polar research, datasets or expeditions…" /><button type="submit">Ask <Arrow>↗</Arrow></button></form>
    <div className="copilot-prompts"><span>SUGGESTED QUESTIONS</span>{copilotSuggestions.map(prompt => <button type="button" key={prompt} onClick={() => submitQuestion(prompt)}>{prompt}</button>)}</div>
    {submittedQuestion && <div className="copilot-response" aria-live="polite"><div className="copilot-response-heading"><span>ANSWER · SOURCE-GROUNDED DEMO</span><small>REVIEW REQUIRED</small></div><p className="copilot-user-question">{submittedQuestion}</p><p>{answer}</p><div className="copilot-sources"><span>EXPEDITION REPORT</span><span>ATMOSPHERIC OBSERVATION SERIES</span><span>PUBLICATION SAMPLE</span></div><div className="copilot-actions"><button type="button" aria-expanded={traceOpen} onClick={() => setTraceOpen(!traceOpen)}>Trace this answer <Arrow>{traceOpen ? '−' : '↗'}</Arrow></button><a href="#explorer">View connected research <Arrow>↗</Arrow></a></div>
      {traceOpen && <div className="provenance-trace" aria-live="polite"><div><small>AI ANSWER</small><strong>Claim kept with its evidence</strong></div><i>↓</i><div><small>SOURCE EVIDENCE</small><strong>Expedition Report · ANT-2024 sample</strong></div><i>↓</i><div><small>DATASET</small><strong>Atmospheric Observation Series · metadata only</strong></div><i>↓</i><div><small>EXPEDITION / PUBLICATION</small><strong>Indian Antarctic Expedition · publication sample</strong></div><i>↓</i><div><small>ORIGINAL INSTITUTION</small><strong>NCPOR · specific source record not mapped in this demo</strong></div><p>Source trail is illustrative; verify any scientific claim in its canonical record.</p></div>}
    </div>}
  </div>;
}

function GraphFeaturePreview({ selectedStation, onOpenGraph }) {
  const [activeId, setActiveId] = useState('station');
  const region = stations[selectedStation]?.region || 'Antarctica';
  const nodes = graphEntitiesFor(region, selectedStation);
  const positions = { expedition: 'n1', researcher: 'n2', institution: 'n3', dataset: 'n4', publication: 'n5', media: 'n6', station: 'n7', education: 'n8' };
  const selected = nodes.find(node => node.id === activeId) || nodes[0];
  return <div className="graph-feature-preview"><div className="graph-demo"><svg viewBox="0 0 420 220" aria-hidden="true"><path d="M66 48 174 80 274 48 348 109 277 168 172 142 66 174M174 80 172 142M274 48 277 168M66 48 348 109" /></svg>{nodes.map(node => <button type="button" key={node.id} aria-pressed={activeId === node.id} onClick={() => setActiveId(node.id)} className={`graph-node ${positions[node.id]}${activeId === node.id ? ' graph-node-active' : ''}`}>{node.kind}</button>)}</div><div className="graph-mini-inspector" aria-live="polite"><small>{selected.kind} · SAMPLE NODE</small><strong>{selected.name}</strong><span>{selected.description}</span></div><a className="graph-open-link" href="#explorer" onClick={onOpenGraph}>Open interactive graph <Arrow>↗</Arrow></a></div>;
}

function FeatureVisual({ feature, selectedStation, onOpenGraph }) {
  if (feature.visual === 'graph') return <GraphFeaturePreview selectedStation={selectedStation} onOpenGraph={onOpenGraph} />;
  if (feature.visual === 'copilot') return <CopilotDemo />;
  if (feature.visual === 'map') return <PolarMap selectedStation={selectedStation} onSelect={() => {}} small />;
  if (feature.visual === 'lab') return <div className="mini-chart-demo"><div className="mini-chart-label">OBSERVATION SERIES <span>DEMO</span></div><DemoChart /></div>;
  if (feature.visual === 'education') return <div className="lesson-demo"><span className="demo-kicker">FIELD NOTE 04 · LEARNING PATH</span><h4>What can ice tell us about a changing climate?</h4><div className="lesson-progress"><i /></div><div className="lesson-footer"><span>Explore the observation</span><span>01 / 04</span></div><div className="lesson-tags"><b>READ</b><b>OBSERVE</b><b>REFLECT</b></div></div>;
  if (feature.visual === 'reach') return <div className="reach-demo"><span className="demo-kicker">ONE SOURCE · SELECT AN AUDIENCE</span><div className="reach-source"><i>R</i><span><b>Expedition report</b><small>Atmospheric observations · source linked</small></span></div><div className="reach-arrow">↓</div><div className="reach-output"><span>PUBLIC EXPLAINER</span><strong>Why Antarctic temperatures matter</strong><small>AI draft · scientific review required</small></div></div>;
  if (feature.visual === 'media') return <div className="media-demo"><div className="media-preview"><span>POLAR FIELD NOTES</span><i>ICE / OCEAN / ATMOSPHERE</i></div><div className="media-asset"><small>CAPTION · SOURCE LINKED</small><p>Research from the polar field, shared with its context intact.</p></div><div className="media-status"><span>SCIENTIFIC REVIEW</span><b>IN PROGRESS</b></div></div>;
  return <div className="repository-demo"><div className="repo-search">⌕ <span>Search polar knowledge</span><kbd>⌘ K</kbd></div>{[['EXPEDITION REPORT', 'Maitri · field observations', 'SOURCE LINKED'], ['DATASET', 'Polar atmosphere · sample record', 'METADATA'], ['PUBLICATION', 'Research in context', 'REVIEWED']].map(([kind, title, status]) => <div className="repo-result" key={kind}><span>{kind}</span><strong>{title}</strong><small>{status} <Arrow>↗</Arrow></small></div>)}</div>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [selectedStation, setSelectedStation] = useState('Maitri');
  const [stationOpen, setStationOpen] = useState(false);
  const [region, setRegion] = useState('Antarctica');
  const [recordType, setRecordType] = useState('All records');
  const [explorerView, setExplorerView] = useState('map');
  const [sourceType, setSourceType] = useState('Research');
  const [educationType, setEducationType] = useState('Student');
  const [labStation, setLabStation] = useState('Maitri');
  const [labVariable, setLabVariable] = useState('Temperature');
  const [labPeriod, setLabPeriod] = useState('2024–2025');
  const [compare, setCompare] = useState(false);
  const [anomaly, setAnomaly] = useState(false);
  const [studioAudience, setStudioAudience] = useState('Public');
  const [studioLanguage, setStudioLanguage] = useState('English');
  const [studioGenerated, setStudioGenerated] = useState(false);
  const [reviewStage, setReviewStage] = useState(2);
  const [reviewDecisions, setReviewDecisions] = useState({});
  const [reviewNotice, setReviewNotice] = useState('');
  const [selectedConnectedSource, setSelectedConnectedSource] = useState('NPDC');
  const [activeStep, setActiveStep] = useState(0);
  const [activeImpact, setActiveImpact] = useState(0);
  const [selectedOutcome, setSelectedOutcome] = useState(0);

  const audience = audiences[educationType];
  const studio = studioCopy[studioAudience];
  const studioTitle = studioLanguage === 'English' ? studio[0] : (reachTranslations[studioLanguage]?.[studioAudience] || studio[0]);
  const reviewsReady = [2, 3, 4].every(index => reviewDecisions[index] === 'Approved');
  const reviewStatusAt = index => index === 5 ? (reviewsReady ? 'Ready for authorised release' : 'Locked until approval') : (reviewDecisions[index] || reviewSteps[index].status);
  const activeConnectedSource = connectedSources.find(item => item.name === selectedConnectedSource) || connectedSources[0];

  return <>
    <header className="site-header">
      <a className="brand" href="#idea" aria-label="Teraquerry, home"><span className="brand-mark">T</span><span className="brand-copy"><strong>Teraquerry</strong><small>POLAR KNOWLEDGE · EDUCATION · OUTREACH</small></span></a>
      <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
      <nav className={menuOpen ? 'primary-nav nav-open' : 'primary-nav'} aria-label="Main navigation">{navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>
    </header>

    <main>
      <section className="hero" id="idea" aria-labelledby="hero-title">
        <div className="hero-image" aria-hidden="true" /><div className="hero-wash" aria-hidden="true" />
        <div className="hero-content page-wrap"><Eyebrow light>SMART INDIA HACKATHON 2026 · NCPOR / MoES</Eyebrow><h1 id="hero-title">From polar research<br />to public knowledge.</h1><p className="hero-subtitle">Teraquerry is an interactive knowledge layer for India’s polar research. Search connected records, follow their sources and shape reviewed learning and outreach drafts.</p><div className="hero-actions"><a className="button button-light" href="#explorer" onClick={() => setExplorerView('graph')}>Explore the Knowledge Graph <Arrow>↗</Arrow></a><a className="button button-outline" href="#features" onClick={() => setSelectedFeature('copilot')}>Ask Teraquerry <Arrow>↗</Arrow></a></div><p className="hero-note">Integrated Polar Knowledge, Education &amp; Outreach Platform</p></div>
        <div className="hero-caption page-wrap"><span>RESEARCH → KNOWLEDGE</span><span>EDUCATION → OUTREACH → PUBLIC UNDERSTANDING</span></div>
      </section>

      <section className="section platform-section" id="platform" aria-labelledby="platform-title">
        <div className="page-wrap"><div className="section-heading heading-split"><div><Eyebrow>THE PLATFORM · DEMONSTRATION VIEW</Eyebrow><h2 id="platform-title">A connected view<br />of polar knowledge.</h2></div><p className="section-intro">Explore a station and follow its connected expeditions, research, datasets, publications and media.</p></div><ExplorerPanel selectedStation={selectedStation} setSelectedStation={setSelectedStation} stationOpen={stationOpen} setStationOpen={setStationOpen} region={region} recordType={recordType} setRecordType={setRecordType} explorerView={explorerView} setExplorerView={setExplorerView} compact /></div>
      </section>

      <section className="section feature-section" id="features" aria-labelledby="features-title">
        <div className="page-wrap"><div className="section-heading heading-split"><div><Eyebrow>EXPLORE THE PLATFORM</Eyebrow><h2 id="features-title">One platform.<br /><em>Different ways to discover.</em></h2></div><p className="section-intro">Select a capability to see how a connected knowledge journey could work in practice.</p></div>
          <div className="feature-grid">{features.map((feature, index) => {
            const isOpen = selectedFeature === feature.id;
            return <article className={`feature-card-wrap${isOpen ? ' feature-card-wrap-open' : ''}`} key={feature.id}>
              <button className={`feature-card${isOpen ? ' feature-card-active' : ''}${[1, 3, 4, 6].includes(index) ? ' feature-card-featured' : ''}`} type="button" aria-expanded={isOpen} aria-controls={`feature-detail-${feature.id}`} onClick={() => setSelectedFeature(isOpen ? null : feature.id)}><span className="feature-card-top"><small>{feature.no} / CAPABILITY</small><i>{feature.icon}</i></span><strong>{feature.title}</strong><span className="feature-purpose">{feature.purpose}</span><span className="feature-hover-hint">Open product preview <Arrow>↗</Arrow></span></button>
              {isOpen && <article className={`feature-inline-detail${index % 2 ? ' feature-popover-right' : ''}`} id={`feature-detail-${feature.id}`} aria-live="polite"><div className="feature-inline-head"><div><span>CAPABILITY {feature.no} · PRODUCT PREVIEW</span><h3>{feature.title}</h3><p>{feature.purpose}</p></div><button className="detail-close" onClick={() => setSelectedFeature(null)} aria-label="Close feature details">×</button></div><div className="feature-detail-body"><div className="feature-visual"><FeatureVisual feature={feature} selectedStation={selectedStation} onOpenGraph={() => setExplorerView('graph')} /></div><div className="feature-detail-copy"><h4>What it does</h4><ul>{feature.capabilities.map(item => <li key={item}>{item}</li>)}</ul><h4>Why it matters</h4><p>{feature.why}</p><div className="technology-line"><span>TECHNOLOGY</span>{feature.tech}</div></div></div></article>}
            </article>;
          })}</div>
        </div>
      </section>

      <section className="section source-section" id="source" aria-labelledby="source-title">
        <div className="page-wrap"><div className="section-heading"><Eyebrow>ONE SOURCE · MANY EXPERIENCES</Eyebrow><h2 id="source-title">One scientific source.<br /><em>Many trusted experiences.</em></h2></div>
          <div className="source-flow"><button className="source-document" type="button" onClick={() => setSourceType('Research')}><span className="document-icon">R</span><small>SCIENTIFIC SOURCE</small><strong>Expedition report</strong><span>Antarctic atmospheric observations</span><b className="source-record-link">SOURCE LINKED <Arrow>↗</Arrow></b></button><div className="source-branches"><div className="branch-lines" aria-hidden="true"><i /><i /><i /><i /><i /></div><div className="experience-tabs">{Object.keys(sourceExperiences).map(item => <button className={sourceType === item ? 'experience-tab active' : 'experience-tab'} onClick={() => setSourceType(item)} key={item}>{item}</button>)}</div><div className="experience-detail" aria-live="polite"><div className="experience-detail-title"><span>{sourceExperiences[sourceType].label}</span><small>LINKED TO SOURCE</small></div><p className="experience-note">{sourceExperiences[sourceType].note}</p><div className="experience-output-list">{sourceExperiences[sourceType].items.map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong><Arrow>↗</Arrow></div>)}</div></div></div></div>
          <p className="source-proof">Every output remains linked to its scientific source.</p>
        </div>
      </section>

      <section className="section explorer-section" id="explorer" aria-labelledby="explorer-title">
        <div className="page-wrap"><div className="section-heading heading-split"><div><Eyebrow>POLAR EXPLORER · SEARCH + GRAPH DEMO</Eyebrow><h2 id="explorer-title">Explore the science<br />by place.</h2></div><p className="section-intro">Search sample records, filter by place and follow their links in a schematic map or interactive knowledge graph. All records are demonstration content.</p></div>
          <div className="explorer-filters"><div className="filter-group"><span>REGION</span>{['Antarctica', 'Arctic', 'Himalaya', 'Southern Ocean'].map(item => <button type="button" key={item} aria-pressed={region === item} className={region === item ? 'filter-chip selected' : 'filter-chip'} onClick={() => { setRegion(item); setSelectedStation(regionSites[item][0]); setStationOpen(false); }}>{item}</button>)}</div><div className="filter-group"><span>RECORD TYPE</span>{['All records', 'Expedition', 'Research', 'Dataset', 'Publication', 'Media', 'Education', 'Station', 'Researcher'].map(item => <button type="button" key={item} aria-pressed={recordType === item} className={recordType === item ? 'filter-chip selected' : 'filter-chip'} onClick={() => setRecordType(item)}>{item}</button>)}</div></div>
          <ExplorerPanel selectedStation={selectedStation} setSelectedStation={setSelectedStation} stationOpen={stationOpen} setStationOpen={setStationOpen} region={region} recordType={recordType} setRecordType={setRecordType} explorerView={explorerView} setExplorerView={setExplorerView} />
          <div className="filter-status"><span>SHOWING {recordType.toUpperCase()} · {region.toUpperCase()}</span><span>Illustrative records · not live NCPOR data</span></div>
        </div>
      </section>

      <section className="section education-section" id="education" aria-labelledby="education-title">
        <div className="page-wrap"><div className="education-layout"><div className="section-heading"><Eyebrow>SMART EDUCATION</Eyebrow><h2 id="education-title">Choose your<br /><em>way into the science.</em></h2><p className="section-intro">Different audiences need different paths through trusted polar research.</p><div className="audience-picker"><span>WHO ARE YOU?</span>{Object.keys(audiences).map(item => <button className={educationType === item ? 'audience-button active' : 'audience-button'} onClick={() => setEducationType(item)} key={item}>{item}<Arrow>↗</Arrow></button>)}</div></div><article className="audience-preview" aria-live="polite"><div className="audience-preview-top"><span>TERAQUERRY LEARNING PATH</span><span>0{Object.keys(audiences).indexOf(educationType) + 1} / 04</span></div><div className="audience-illustration" data-audience={educationType.toLowerCase()} aria-label={`${educationType} learning journey diagram`}><div className="orbit orbit-one" /><div className="orbit orbit-two" /><i className="orbit-core">{educationType.slice(0, 1).toUpperCase()}</i>{audienceJourneys[educationType].map((step, index) => <span className={`orbit-label orbit-stage orbit-stage-${index + 1}`} key={step}>{step}</span>)}</div><div className="audience-copy"><Eyebrow>{educationType.toUpperCase()} EXPERIENCE</Eyebrow><h3>{audience.title}</h3><p>{audience.intro}</p><ul>{audience.items.map((item, i) => <li key={item}><span>0{i + 1}</span>{item}<Arrow>↗</Arrow></li>)}</ul></div><div className="audience-preview-foot"><span>RESEARCH-LINKED LEARNING</span><span>DEMO EXPERIENCE</span></div></article></div></div>
      </section>

      <section className="section lab-section" id="lab" aria-labelledby="lab-title">
        <div className="page-wrap"><div className="section-heading heading-split"><div><Eyebrow>POLAR DATA LAB · ILLUSTRATIVE SERIES</Eyebrow><h2 id="lab-title">Look closer<br />at the observations.</h2></div><p className="section-intro">A simple learning interface for exploring variables and asking better questions of scientific records.</p></div>
          <div className="lab-console"><div className="lab-controls"><div className="lab-console-title"><span>OBSERVATION VIEWER</span><small>DEMO SERIES · NOT LIVE DATA</small></div><label>STATION<select value={labStation} onChange={e => setLabStation(e.target.value)}>{Object.keys(stations).map(site => <option key={site}>{site}</option>)}</select></label><label>VARIABLE<select value={labVariable} onChange={e => setLabVariable(e.target.value)}><option>Temperature</option><option>Wind speed</option><option>Sea ice</option></select></label><label>PERIOD<select value={labPeriod} onChange={e => setLabPeriod(e.target.value)}><option>2024–2025</option><option>2023–2024</option><option>2019–2020</option></select></label><div className="lab-actions"><button className={compare ? 'lab-action active' : 'lab-action'} onClick={() => setCompare(!compare)}>Compare {compare ? 'on' : 'series'}</button><button className={anomaly ? 'lab-action active' : 'lab-action'} onClick={() => setAnomaly(!anomaly)}>{anomaly ? 'Hide' : 'Identify'} anomaly</button><a className="lab-action" href="#how">Learn more <Arrow>↗</Arrow></a></div></div><div className="lab-chart-area"><div className="chart-heading"><div><span>{labVariable.toUpperCase()} VS TIME</span><small>{stations[labStation].title} · {labPeriod}</small></div><div className="chart-legend"><span><i /> SAMPLE SERIES</span>{compare && <span><i className="legend-alt" /> COMPARISON</span>}</div></div><DemoChart compare={compare} variable={labVariable} station={labStation} period={labPeriod} anomaly={anomaly} /><div className="chart-foot"><span>Illustrative visualization · verify against an approved dataset before interpretation.</span>{anomaly && <strong className="anomaly-note">DEMO PATTERN FLAGGED · REVIEW SOURCE DATA</strong>}</div></div></div><p className="lab-caption">Explore scientific observations. Interpret them with their source and context.</p>
        </div>
      </section>

      <section className="section reach-section" id="reach" aria-labelledby="reach-title">
        <div className="page-wrap"><div className="section-heading heading-split"><div><Eyebrow>RESEARCH → REACH STUDIO</Eyebrow><h2 id="reach-title">One research artifact.<br /><em>Many ways to communicate.</em></h2></div><p className="section-intro">Create a source-linked draft for a specific audience, then route it through scientific and outreach review.</p></div>
          <div className="studio-board"><div className="studio-step"><span className="studio-step-no">01 · SOURCE</span><div className="studio-source-icon">R</div><strong>Expedition report</strong><p>Antarctic atmospheric observations</p><small>APPROVED SOURCE · LINKED · ANT-2024 DEMO</small></div><div className="studio-connector"><span>→</span></div><div className="studio-step audience-step"><span className="studio-step-no">02 · SELECT AUDIENCE</span><div className="studio-audiences">{Object.keys(studioCopy).map(item => <button type="button" aria-pressed={studioAudience === item} className={studioAudience === item ? 'studio-audience active' : 'studio-audience'} key={item} onClick={() => { setStudioAudience(item); setStudioGenerated(false); }}>{item}</button>)}</div><label className="studio-language-label">LANGUAGE<select value={studioLanguage} onChange={event => { setStudioLanguage(event.target.value); setStudioGenerated(false); }}>{['English', 'Hindi', 'Marathi', 'Bengali', 'Tamil', 'Telugu'].map(language => <option key={language}>{language}</option>)}</select></label><p className="studio-audience-note">The source stays attached as the format changes.</p></div><div className="studio-connector"><span>→</span></div><div className="studio-step generated-step" aria-live="polite"><span className="studio-step-no">03 · GENERATED OUTPUT</span><div className="generated-document"><span>{studio[1].split('·')[0].trim().toUpperCase()} · {studioLanguage.toUpperCase()}</span><strong>{studioTitle}</strong><p>Preview for {studioAudience.toLowerCase()} · {studioLanguage}.</p><small><i /> {studioGenerated ? 'LOCAL DEMO DRAFT · REVIEW REQUIRED' : 'SAMPLE PREVIEW · NOT PUBLISHED'}</small></div><button type="button" className="generate-draft" onClick={() => setStudioGenerated(true)}>{studioGenerated ? 'Regenerate demo draft' : 'Generate draft'} <Arrow>↗</Arrow></button><div className="studio-provenance"><strong>SOURCE LINKED</strong><span>Generated from: Expedition Report · ANT-2024 demo</span><span>Related dataset: Atmospheric Observation Series</span><span>Review status: AI draft · human review required</span>{studioLanguage !== 'English' && <small>Sample translation · language and science review required.</small>}</div></div></div>
          <div className="approval-ribbon"><span className="approval-active"><i /> AI DRAFT</span><b>→</b><span><i /> SCIENTIFIC REVIEW</span><b>→</b><span><i /> APPROVED FOR OUTREACH</span><small>AI does not automatically publish scientific content.</small></div>
        </div>
      </section>

      <section className="section trust-section" id="trust" aria-labelledby="trust-title">
        <div className="page-wrap"><div className="section-heading heading-split"><div><Eyebrow>HUMAN REVIEW · PROVENANCE</Eyebrow><h2 id="trust-title">Every step has<br /><em>a responsible owner.</em></h2></div><p className="section-intro">Source, review status and approval stay visible from the first draft through publication.</p></div>
          <div className="review-flow">{reviewSteps.map(({ title, detail, owner }, index) => <button type="button" aria-current={reviewStage === index ? 'step' : undefined} className={`review-stage${reviewStage === index ? ' review-selected' : ''}${index < reviewStage ? ' review-complete' : ''}`} onClick={() => { setReviewStage(index); setReviewNotice(''); }} key={title}><div className="review-stage-top"><span>0{index + 1}</span><i>{index <= reviewStage ? '✓' : '·'}</i></div><strong>{title}</strong><span>{detail}</span><em className="review-owner">OWNER · {owner}</em><small>{reviewStatusAt(index).toUpperCase()}</small></button>)}</div>
          <div className="review-inspector" aria-live="polite"><div className="review-avatar">{['RS', 'AI', 'DS', 'SC', 'AP', 'RP'][reviewStage]}</div><div className="review-inspector-copy"><span>REVIEW RECORD · STEP 0{reviewStage + 1}</span><strong>{reviewSteps[reviewStage].owner} · {reviewSteps[reviewStage].title.toLowerCase()}</strong><p>{reviewSteps[reviewStage].role} Demonstration workflow; assigned reviewers are illustrative.</p><p className="review-authority-note">AI assists drafting. Human review remains authoritative.</p></div><span className="review-state">{reviewStatusAt(reviewStage).toUpperCase()}</span>
            {reviewNotice && <p className="review-notice" role="status">{reviewNotice}</p>}
            {[2, 3, 4].includes(reviewStage) && <div className="review-action-panel"><strong>{reviewStage === 2 ? 'Scientific review checks' : reviewStage === 3 ? 'Outreach review checks' : 'Final approval checks'}</strong><ul>{(reviewStage === 2 ? ['Source accuracy', 'Citation verification', 'Scientific consistency', 'Unsupported claims'] : reviewStage === 3 ? ['Audience clarity', 'Context and attribution', 'Accessible language', 'Source links retained'] : ['Scientific review recorded', 'Outreach review recorded', 'Access status confirmed', 'Release owner assigned']).map(item => <li key={item}><span>✓</span>{item}</li>)}</ul><div className="review-action-buttons"><button type="button" onClick={() => { const approvedStep = reviewStage; setReviewDecisions(previous => ({ ...previous, [approvedStep]: 'Approved' })); setReviewNotice(approvedStep === 4 ? 'Final approval recorded. An authorised publisher must release the content separately.' : `${reviewSteps[approvedStep].title.toLowerCase()} approved. The next human review stage is ready.`); if (approvedStep < 4) setReviewStage(approvedStep + 1); }}>Approve this step</button><button type="button" onClick={() => { const revisionStep = reviewStage; setReviewDecisions(previous => ({ ...previous, [revisionStep]: 'Revision requested' })); setReviewNotice(`${reviewSteps[revisionStep].title.toLowerCase()} returned for revision. Nothing has been published.`); setReviewStage(1); }}>Request revision</button></div></div>}
            {reviewStage === 5 && <p className="review-publish-lock">Publishing is a separate, authorised action and is not available in this demo.</p>}
          </div>
        </div>
      </section>

      <section className="section ecosystem-section" id="ecosystem" aria-labelledby="ecosystem-title">
        <div className="page-wrap"><div className="section-heading"><Eyebrow>INTEGRATION, NOT REPLACEMENT</Eyebrow><h2 id="ecosystem-title">Built to connect.<br /><em>Not replace.</em></h2></div>
          <div className="architecture"><div className="architecture-dataflow" aria-label="Concept architecture flow: users, Teraquerry interface, search and knowledge graph, metadata and vector search, connected sources"><strong>USERS</strong><b>↓</b><strong>TERAQUERRY INTERFACE</strong><b>↓</b><strong>SEARCH + GRAPH + RAG</strong><b>↓</b><strong>METADATA / VECTOR SEARCH</strong><b>↓</b><strong>CONNECTED SOURCES</strong></div><div className="architecture-layer existing-layer"><div className="architecture-label"><span>01</span><strong>CONNECTED SCIENTIFIC SOURCES</strong><small>Canonical records stay with their institutions</small></div><div className="resource-list">{['NPDC', 'NCPOR', 'ESSDP', 'Publications', 'Expedition records', 'Media'].map((item, i) => <span key={item}><i>{['⌘', '⌁', '▤', '≋', '⌖', '▧'][i]}</i>{item}</span>)}</div></div><div className="architecture-connector"><i /><span>Metadata, identifiers, source links and access rules</span><i /></div><div className="architecture-layer teraquerry-layer"><div className="architecture-label"><span>02</span><strong>TERAQUERRY INTERFACE + KNOWLEDGE LAYER</strong><small>Users search, explore, ask, adapt and review</small></div><div className="teraquerry-pipeline">{['SEARCH', 'GRAPH + RAG', 'AUDIENCE DRAFTS', 'HUMAN REVIEW'].map((item, i) => <React.Fragment key={item}><span>{item}</span>{i < 3 && <b>→</b>}</React.Fragment>)}</div></div><div className="architecture-detail-strip"><div><strong>INDEX LAYER</strong><span>Metadata · entity links · vector search · source identifiers</span></div><div><strong>AI LAYER</strong><span>Semantic search · retrieval-augmented generation · summaries · translation</span></div><div><strong>TRUST LAYER</strong><span>Citations · provenance · versioning · review · access control</span></div></div><div className="architecture-connector"><i /><span>Connected records support research, education and outreach</span><i /></div><div className="architecture-layer audience-layer"><div className="architecture-label"><span>03</span><strong>CONNECTED EXPERIENCES</strong><small>Information can be discovered and reused at its source</small></div><div className="resource-list audience-resources">{['Research', 'Education', 'Public knowledge', 'Media', 'Outreach'].map(item => <span key={item}>{item}<Arrow>↗</Arrow></span>)}</div></div></div>
          <div className="source-directory"><div className="source-directory-heading"><div><Eyebrow>CONNECTED SOURCES</Eyebrow><h3>Find the canonical record.</h3></div><p>Statuses describe this prototype view; they do not imply a live integration.</p></div><div className="source-directory-grid">{connectedSources.map(source => <button type="button" aria-pressed={selectedConnectedSource === source.name} className={selectedConnectedSource === source.name ? 'source-directory-card selected' : 'source-directory-card'} onClick={() => setSelectedConnectedSource(source.name)} key={source.name}><small>{source.status}</small><strong>{source.name}</strong><span>{source.description}</span></button>)}</div><div className="source-directory-detail" aria-live="polite"><div><span>CANONICAL RECORD</span><strong>{activeConnectedSource.canonical}</strong></div><div><span>ACCESS</span><strong>{activeConnectedSource.access}</strong></div><div><span>PROTOTYPE STATUS</span><strong>{activeConnectedSource.source}</strong></div>{activeConnectedSource.url ? <a href={activeConnectedSource.url} target="_blank" rel="noreferrer">Open original source <Arrow>↗</Arrow></a> : <span className="source-link-unavailable">External endpoint not configured in this demo</span>}</div></div>
          <p className="ecosystem-statement">Teraquerry connects metadata and discovery while original repositories remain authoritative for access and scientific records.</p>
        </div>
      </section>

      <section className="section process-section" id="how" aria-labelledby="how-title">
        <div className="page-wrap"><div className="section-heading heading-split"><div><Eyebrow>HOW IT WORKS</Eyebrow><h2 id="how-title">From source<br /><em>to shared knowledge.</em></h2></div><p className="section-intro">Select a step to see what happens along the research-to-public journey.</p></div>
          <div className="process-tabs">{processSteps.map(([no, title], index) => <button className={activeStep === index ? 'process-tab active' : 'process-tab'} key={no} onClick={() => setActiveStep(index)}><span>{no}</span><strong>{title}</strong>{index < processSteps.length - 1 && <i>→</i>}</button>)}</div><article className="process-detail" aria-live="polite"><span className="process-detail-index">{processSteps[activeStep][0]}</span><div><Eyebrow>THE KNOWLEDGE JOURNEY</Eyebrow><h3>{processSteps[activeStep][1]}</h3><p>{processSteps[activeStep][3]}</p></div><div className="process-example"><small>IN THIS STEP</small><strong>{processSteps[activeStep][2]}</strong><span>{activeStep < 2 ? 'Source records and context remain linked.' : activeStep === 4 ? 'Publication follows review and approval.' : 'The next step keeps the science connected.'}</span></div></article>
        </div>
      </section>

      <section className="section impact-section" id="impact" aria-labelledby="impact-title">
        <div className="page-wrap"><div className="section-heading heading-split"><div><Eyebrow>WHY TERAQUERRY MATTERS</Eyebrow><h2 id="impact-title">More connected science.<br /><em>More meaningful reach.</em></h2></div><p className="section-intro">Choose an impact area to see how the same connected knowledge supports different people.</p></div>
          <div className="impact-interactive"><div className="impact-selector">{impactItems.map(([title], index) => <button className={activeImpact === index ? 'impact-option active' : 'impact-option'} onClick={() => setActiveImpact(index)} key={title}><span>0{index + 1}</span>{title}<Arrow>↗</Arrow></button>)}</div><div className="impact-story" aria-live="polite"><Eyebrow>0{activeImpact + 1} · {impactItems[activeImpact][0]}</Eyebrow><h3>{impactItems[activeImpact][1]}</h3><p>{impactItems[activeImpact][2]}</p><div className="impact-story-visual"><div className="impact-source"><span>CONNECTED POLAR KNOWLEDGE</span><strong>Evidence with context</strong></div><Arrow>→</Arrow><div className="impact-audience">{['Researchers', 'Students', 'Teachers', 'Media', 'Public', 'NCPOR teams'].map(item => <span key={item}>{item}</span>)}</div></div></div></div>
          <div className="before-after"><div className="transformation-side before"><span>BEFORE · RESOURCES IN MANY PLACES</span><div>{['Research', 'Expedition records', 'Stations', 'Datasets', 'Publications', 'Media', 'Education'].map(item => <i key={item}>{item}</i>)}</div></div><div className="transform-arrow">→</div><div className="transformation-side after"><span>AFTER TERAQUERRY · ONE CONNECTED KNOWLEDGE GRAPH</span><div className="knowledge-path">{['Researcher', 'Expedition', 'Station', 'Dataset', 'Publication', 'Media', 'Education', 'Public outreach'].map((item, index) => <React.Fragment key={item}><i>{item}</i>{index < 7 && <b>↕</b>}</React.Fragment>)}</div></div></div>
        </div>
      </section>

      <section className="section ten-section" id="demo" aria-labelledby="ten-title">
        <div className="page-wrap"><div className="section-heading"><Eyebrow>THE 1 → 10 DEMONSTRATION</Eyebrow><h2 id="ten-title">One scientific source.<br /><em>Ten useful outcomes.</em></h2></div><div className="ten-demo"><button type="button" className="ten-source" onClick={() => setSelectedOutcome(0)}><span>ORIGINAL SOURCE · ANT-2024 DEMO</span><strong>Expedition<br />report</strong><small>One prototype scientific record</small></button><div className="ten-outputs">{outcomes.map((item, i) => <button type="button" aria-pressed={selectedOutcome === i} className={selectedOutcome === i ? 'outcome-card outcome-selected' : 'outcome-card'} key={item} style={{ '--outcome-delay': `${i * 55}ms` }} onClick={() => setSelectedOutcome(i)}><span>{String(i + 1).padStart(2, '0')}</span><strong>{item}</strong><Arrow>↗</Arrow></button>)}</div></div><div className="outcome-detail" aria-live="polite"><span>0{selectedOutcome + 1} / 10 · SOURCE-LINKED OUTPUT</span><strong>{outcomes[selectedOutcome]}</strong><p>{outcomeDescriptions[selectedOutcome]}</p><div className="outcome-provenance"><span>ORIGINAL SOURCE · Expedition Report · ANT-2024 demo</span><span>RELATED DATASET · Atmospheric Observation Series · metadata only</span><span>REVIEW STATUS · AI draft · human review required</span><a href="#source">View source provenance <Arrow>↗</Arrow></a></div></div><p className="ten-note">Every output remains traceable to its original scientific source.</p></div>
      </section>

      <section className="final-section" id="final" aria-labelledby="final-title"><div className="final-inner page-wrap"><Eyebrow light>THE TERAQUERRY VISION</Eyebrow><h2 id="final-title">Connect the science.<br /><em>Expand the reach.</em></h2><p>Teraquerry creates a bridge between India’s polar research ecosystem and the people who learn from, communicate and build upon it.</p><div className="final-pipeline">{['RESEARCH', 'KNOWLEDGE', 'EDUCATION', 'OUTREACH', 'PUBLIC UNDERSTANDING'].map((item, i) => <React.Fragment key={item}><span>{item}</span>{i < 4 && <b>↓</b>}</React.Fragment>)}</div><a className="button button-light final-cta" href="#platform">Explore Teraquerry <Arrow>↗</Arrow></a><footer className="site-footer"><a className="footer-brand" href="#idea">TERAQUERRY <span>Integrated Polar Knowledge, Education &amp; Outreach Platform</span></a><div className="footer-partners"><span>SIH 2026</span><span>MoES</span><span>NCPOR</span><span>Smart Education</span></div><small>Concept demonstration · illustrative records and interface</small></footer></div></section>
    </main>
  </>;
}

createRoot(document.getElementById('root')).render(<App />);

