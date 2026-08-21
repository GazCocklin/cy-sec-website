// Taster landing-page configs.
// One block per cert; page component (src/pages/TasterPage.jsx) reads from here.
//
// To add a new cert (CySA+, A+ etc.) when conversion data justifies it,
// add a new keyed entry below and add the route in src/App.jsx.

const SHARED_FAQ = [
  {
    q: 'Do I need to install anything?',
    a: 'No. The lab runs in your browser. Chrome, Safari, Firefox, Edge — modern versions.',
  },
  {
    q: "What's a PBQ?",
    a: "Performance-Based Question. CompTIA's hands-on exam format. You operate real tools to solve a scenario, not pick from A/B/C/D.",
  },
  {
    q: 'Will this work on my laptop or mobile?',
    a: "Laptop or desktop recommended. The lab consoles are dense — mobile works but you'll be squinting.",
  },
  {
    q: 'What happens after the taster — will I get spammed?',
    a: "A short email sequence over two weeks, then we stop. Unsubscribe at any point. We don't sell your address.",
  },
  // Q5 (affiliation) is cert-specific and lives in each cert block below.
];

export const TASTER_CONFIGS = {
  networkplus: {
    certKey: 'networkplus',
    badge: {
      file: 'comptia-network-plus.svg',
      label: 'CompTIA Network+ · N10-009',
    },
    hero: {
      h1: 'Try a real N10-009 PBQ in your browser. No card, no install.',
      sub: 'One scenario, one network, one fix. Built by working practitioners — not generated, not simulated.',
      loopVideo: null, // TBD — Marketing to deliver
      fallbackImage: '/screenshots/fl-netsim.png',
      fallbackAlt: 'FortifyLearn network simulator console',
    },
    ctaLabel: 'Start the N10-009 taster',
    whatYouDo: [
      'Trace a connectivity failure from client to server. Find where the path breaks.',
      "Read the running configs. Spot the misconfiguration that's dropping traffic.",
      'Apply the fix, verify the path is up, document the change.',
    ],
    differentiation: {
      h2: 'Most CompTIA prep tests whether you can recognise a network. Ours puts you in one.',
      body: "Click-through simulations teach you to recognise screenshots. Real network simulators teach you to make decisions. FortifyLearn runs the same network simulator, packet capture, and configuration tooling you'll find in working IT environments.",
      images: [
        { src: '/screenshots/fl-netsim.png',    caption: 'Network simulator' },
        { src: '/screenshots/fl-netcap.png',    caption: 'Packet capture' },
        { src: '/screenshots/fl-readiness.png', caption: 'Readiness dashboard' },
      ],
    },
    faq: [
      ...SHARED_FAQ,
      {
        q: 'Is this affiliated with CompTIA?',
        a: 'No. CompTIA, Network+ and N10-009 are registered marks of CompTIA. FortifyLearn is an independent training platform.',
      },
    ],
    meta: {
      title: 'Try a real N10-009 PBQ in your browser | FortifyLearn',
      description: 'A free hands-on Network+ PBQ. No card, no install — runs in your browser. Built by working practitioners.',
    },
  },

  securityplus: {
    certKey: 'securityplus',
    badge: {
      file: 'comptia-security-plus.svg',
      label: 'CompTIA Security+ · SY0-701',
    },
    hero: {
      h1: 'Try a real SY0-701 PBQ in your browser. No card, no install.',
      sub: 'One scenario, one console, one verdict. Built from real defensive work — not generated, not simulated.',
      loopVideo: null, // TBD — Marketing to deliver
      fallbackImage: '/screenshots/fl-siem.png',
      fallbackAlt: 'FortifyLearn SIEM console',
    },
    ctaLabel: 'Start the SY0-701 taster',
    whatYouDo: [
      'Review a suspicious event stream in a real SIEM. Identify what warrants escalation.',
      'Pivot from event to host. Confirm what you suspect.',
      'Recommend the right response and document your reasoning.',
    ],
    differentiation: {
      h2: 'Most CompTIA prep tests whether you can recognise a SIEM. Ours opens one.',
      body: "Click-through simulations teach you to recognise screenshots. Real consoles teach you to make decisions. FortifyLearn labs run the same SIEM, packet capture, and security tooling you'll see in a working SOC — because they are working SOC tools.",
      images: [
        { src: '/screenshots/fl-siem.png',      caption: 'Live SIEM' },
        { src: '/screenshots/fl-netcap.png',    caption: 'Packet capture' },
        { src: '/screenshots/fl-readiness.png', caption: 'Readiness dashboard' },
      ],
    },
    faq: [
      ...SHARED_FAQ,
      {
        q: 'Is this affiliated with CompTIA?',
        a: 'No. CompTIA, Security+ and SY0-701 are registered marks of CompTIA. FortifyLearn is an independent training platform.',
      },
    ],
    meta: {
      title: 'Try a real SY0-701 PBQ in your browser | FortifyLearn',
      description: 'A free hands-on Security+ PBQ. No card, no install — runs in your browser. Built from real defensive work.',
    },
  },
};

export default TASTER_CONFIGS;
