export type FarmerLang = 'en' | 'hi';

export const farmerTranslations = {
  en: {
    // Header
    farmerTitle: 'Verified Farmer Producer',
    location: 'Ludhiana, Punjab • Agro-Climatic Zone VI',
    reputationScore: 'Reputation Score',
    completedHarvests: 'Completed Harvests',
    fulfillmentRate: 'On-Time Delivery',
    scoreExcellent: 'Top 5% Trust Tier',
    viewReputation: 'View Scorecard',
    createListing: '+ Add New Harvest',

    // Language Toggle
    english: 'English',
    hindi: 'हिन्दी',

    // Dilemma vs Solution
    dilemmaTitle: 'The Traditional Problem',
    dilemmaDesc: 'Taking high-interest loans (24-36% APR) for seeds & fertilizer, growing blindly without buyers, and forced distress selling at the local mandi.',
    solutionTitle: 'The Demand2Crop Solution',
    solutionDesc: 'Pre-sold orders locked in bank escrow before sowing! Guaranteed fixed price and 30% upfront money for seeds, fertilizer & field prep.',

    // Active Crop Card
    activeCropTitle: 'Active Pre-Sold Harvest',
    activeContract: 'Active Order',
    harvestDateLabel: 'Harvest Date',
    assignedHubLabel: 'Assigned Hub',
    simulateYieldBtn: 'Simulate Yield Shortfall',
    auditContractBtn: 'View Agreement',

    // 6 Metrics
    totalQuantity: 'Total Harvest Target',
    totalQuantitySub: 'Expected Yield',
    committedDemand: 'Pre-Sold Quantity',
    committedDemandSub: 'Pre-Sold',
    remainingAvailable: 'Remaining for Sale',
    remainingAvailableSub: 'Open on Market',
    guaranteedPrice: 'Guaranteed Price',
    guaranteedPriceSub: 'Locked Rate (No Haggling)',
    activeBuyers: 'Committed Buyers',
    activeBuyersSub: 'Funds in Escrow',
    expectedRevenue: 'Expected Revenue',
    expectedRevenueSub: 'Bank Protected',

    // Progress Bar
    progressLabel: 'Forward Demand Pre-Commitment Progress',
    escrowSecured: 'Escrow Secured',
    advanceCapitalNotice: '🎉 Great News: 30% Advance Working Capital (₹1,950) unlocked for seeds & fertilizer! ₹6,500 total locked safely in escrow.',
    awaitingCommitments: 'Awaiting buyer commitments to unlock 30% advance capital.',

    // Lifecycle Stepper
    lifecycleTitle: 'Crop Journey & Stage Progression',
    lifecycleSubtitle: 'You update each milestone as your crop grows. Verified steps release payment disbursements directly to your account.',
    nextStageButton: 'Advance to',
    phaseLabel: 'Step',

    // Other Listings
    allListingsTitle: 'All Active Forward Harvest Listings',
    committedLabel: 'Committed',
    targetLabel: 'Target',
    harvestLabel: 'Harvest',

    // Quick Farmer Guide
    guideTitle: 'How Demand2Crop Works For You',
    step1Title: '1. Demand First',
    step1Desc: 'Buyers pre-order your harvest months before you plant.',
    step2Title: '2. 30% Seed Advance',
    step2Desc: 'Get funds for certified seeds & fertilizer upfront with zero debt.',
    step3Title: '3. Guaranteed Rate',
    step3Desc: 'No middlemen or price crashes at harvest time.',

    // Modals
    modalClose: 'Close',
    modalCancel: 'Cancel',

    // Create Modal
    createModalTitle: 'Create Future Harvest Listing',
    createModalSubtitle: 'Lock guaranteed pre-orders and working capital before planting',
    cropLabel: 'Crop',
    varietyLabel: 'Seed Variety / Class',
    quantityLabel: 'Expected Harvest (kg)',
    priceLabel: 'Guaranteed Price (₹ / kg)',
    harvestDateInputLabel: 'Expected Harvest Date',
    locationLabel: 'Farm Location / District',
    descriptionLabel: 'Farming Practice & Soil Notes',
    estRevenueLabel: 'Total Expected Revenue',
    upfrontCapitalLabel: '30% Advance for Seeds/Fertilizer',
    createSubmitBtn: 'Publish Harvest & Get Buyers',

    // Yield Simulator Modal
    simModalTitle: 'Yield Shortfall & Weather Risk Simulator',
    simModalSubtitle: 'Fair, transparent smart-contract payout if drought or weather lowers yield',
    simActualYield: 'Simulated Actual Harvest',
    simFarmerPayout: 'Farmer Final Payment',
    simFarmerPayoutDesc: 'Full agreed price paid for all harvested quantity',
    simBuyerRefund: 'Buyer Refund Pool',
    simBuyerRefundDesc: 'Automatic refund for shortfall not produced',
    simFormulaTitle: 'Automated Fair Settlement Formula',
    simSet700: 'Set 700 kg (Example Shortfall)',
    simExecuteBtn: 'Execute Settlement',

    // Reputation Modal
    repModalTitle: 'Farmer Reputation & Scorecard',
    repModalSubtitle: 'Cryptographically verified on-chain trust score based on fulfilled harvests',
    repTierBadge: 'Tier 1 Verified Producer',
    repCompleted: 'Completed',
    repFulfillment: 'Fulfillment',
    repOnTime: 'On-Time',
    repQuality: 'Quality Pass',
    repBadgesTitle: 'Verified Agricultural Accreditations',
    repRecentTitle: 'Recent Completed Harvests',
    repZeroDefault: 'Zero defaults across 4 years of forward farming'
  },
  hi: {
    // Header
    farmerTitle: 'सत्यापित किसान उत्पादक',
    location: 'लुधियाना, पंजाब • उपजाऊ कृषि क्षेत्र',
    reputationScore: 'साख (स्कोर)',
    completedHarvests: 'सफल फसलें',
    fulfillmentRate: 'समय पर डिलीवरी',
    scoreExcellent: 'शीर्ष 5% भरोसेमंद किसान',
    viewReputation: 'साख व स्कोरकार्ड',
    createListing: '+ नई फसल जोड़ें',

    // Language Toggle
    english: 'English',
    hindi: 'हिन्दी',

    // Dilemma vs Solution
    dilemmaTitle: 'पुरानी मंडी प्रथा की समस्या',
    dilemmaDesc: 'बुवाई के समय खाद-बीज के लिए 24-36% महंगे ब्याज पर कर्ज, बिना खरीदार के अनिश्चित खेती और कटाई पर बिचौलियों के हाथों औने-पौने दाम पर मजबूरी में बिक्री।',
    solutionTitle: 'Demand2Crop का नया समाधान',
    solutionDesc: 'बुवाई से पहले ही खरीदार पक्के और पैसा बैंक में जमा! तय पक्का भाव, कोई मोलभाव नहीं, और बुवाई होते ही खाद-बीज के लिए 30% अग्रिम पैसा!',

    // Active Crop Card
    activeCropTitle: 'सक्रिय अग्रिम बिकी फसल',
    activeContract: 'पक्का सौदा सक्रिय',
    harvestDateLabel: 'कटाई का समय',
    assignedHubLabel: 'डिलीवरी वेयरहाउस',
    simulateYieldBtn: 'पैदावार नुकसान सिम्युलेटर',
    auditContractBtn: 'डिजिटल अनुबंध देखें',

    // 6 Metrics
    totalQuantity: 'कुल अपेक्षित पैदावार',
    totalQuantitySub: 'अनुमानित उपज',
    committedDemand: 'पहले से बिकी फसल',
    committedDemandSub: 'खरीदारों द्वारा बुक',
    remainingAvailable: 'बिक्री हेतु शेष',
    remainingAvailableSub: 'बाजार में खुली',
    guaranteedPrice: 'तयशुदा पक्का भाव',
    guaranteedPriceSub: 'गारंटीड रेट (कोई मोलभाव नहीं)',
    activeBuyers: 'जुड़े हुए खरीदार',
    activeBuyersSub: 'पैसा बैंक में सुरक्षित',
    expectedRevenue: 'कुल तयशुदा कमाई',
    expectedRevenueSub: 'बैंक में पूर्ण सुरक्षित',

    // Progress Bar
    progressLabel: 'फसल की अग्रिम मांग व बुकिंग प्रगति',
    escrowSecured: 'बैंक में सुरक्षित राशि',
    advanceCapitalNotice: '🎉 शुभ समाचार: बीज, खाद और जुताई के लिए ₹1,950 (30% अग्रिम राशि) आपके लिए स्वीकृत! कुल ₹6,500 बैंक में सुरक्षित।',
    awaitingCommitments: 'अग्रिम राशि अनलॉक करने के लिए खरीदार की बुकिंग की प्रतीक्षा है।',

    // Lifecycle Stepper
    lifecycleTitle: 'फसल का सफर एवं भुगतान चरण',
    lifecycleSubtitle: 'आप हर कदम की स्थिति दर्ज करते हैं। जैसे-जैसे आपकी फसल आगे बढ़ती है, पैसा सीधे आपके बैंक खाते में भेजा जाता है।',
    nextStageButton: 'अगला चरण बढ़ाएं',
    phaseLabel: 'चरण',

    // Other Listings
    allListingsTitle: 'आपकी अन्य सभी सक्रिय फसलें',
    committedLabel: 'बुक हुई',
    targetLabel: 'लक्ष्य',
    harvestLabel: 'कटाई',

    // Quick Farmer Guide
    guideTitle: 'Demand2Crop आपके लिए कैसे काम करता है?',
    step1Title: '१. मांग पहले (ऑर्डर पक्का)',
    step1Desc: 'फसल बोने से पहले ही खरीदार आपकी पूरी पैदावार बुक कर लेते हैं।',
    step2Title: '२. ३०% अग्रिम राशि',
    step2Desc: 'बुवाई के समय ही बीज और खाद का पैसा बिना किसी ब्याज या कर्ज के पाएं।',
    step3Title: '३. तय भाव, पक्की कमाई',
    step3Desc: 'कटाई के समय मंडी में भाव गिरने या बिचौलियों के शोषण का कोई डर नहीं।',

    // Modals
    modalClose: 'बंद करें',
    modalCancel: 'रद्द करें',

    // Create Modal
    createModalTitle: 'नई भविष्य की फसल दर्ज करें',
    createModalSubtitle: 'बुवाई से पहले ही खरीदार पक्के करें और अग्रिम पूंजी प्राप्त करें',
    cropLabel: 'फसल चुनें',
    varietyLabel: 'बीज की किस्म / क्लास',
    quantityLabel: 'अपेक्षित पैदावार (किलो)',
    priceLabel: 'मांग का तय भाव (₹ प्रति किलो)',
    harvestDateInputLabel: 'कटाई की अनुमानित तारीख',
    locationLabel: 'खेत का स्थान / जिला',
    descriptionLabel: 'खेती का तरीका व मिट्टी विवरण',
    estRevenueLabel: 'कुल संभावित कमाई',
    upfrontCapitalLabel: 'बुवाई पर 30% अग्रिम सहायता',
    createSubmitBtn: 'फसल दर्ज करें व ऑर्डर पाएं',

    // Yield Simulator Modal
    simModalTitle: 'पैदावार नुकसान एवं सूखा जोखिम सिम्युलेटर',
    simModalSubtitle: 'यदि सूखा या कीट से फसल कम होती है, तो बैंक निष्पक्षता से किसान और खरीदार दोनों का हिसाब करता है',
    simActualYield: 'खेत से निकली वास्तविक उपज',
    simFarmerPayout: 'किसान को मिलने वाला भुगतान',
    simFarmerPayoutDesc: 'जितनी फसल निकली, उसका तयशुदा भाव पर पूरा भुगतान',
    simBuyerRefund: 'खरीदार को रिफंड राशि',
    simBuyerRefundDesc: 'जो फसल नहीं उग सकी, उसका पैसा खरीदार को तुरंत वापस',
    simFormulaTitle: 'स्मार्ट कॉन्ट्रैक्ट स्वचालित निष्पक्ष फॉर्मूला',
    simSet700: '700 किलो सेट करें (उदाहरण)',
    simExecuteBtn: 'निपटान लागू करें',

    // Reputation Modal
    repModalTitle: 'किसान साख व स्कोरकार्ड',
    repModalSubtitle: 'पिछली सफल फसलों और समय पर आपूर्ति का 100% सत्यापित डिजिटल रिकॉर्ड',
    repTierBadge: 'टियर-1 प्रमाणित किसान',
    repCompleted: 'सफल फसलें',
    repFulfillment: 'पैदावार मिलान',
    repOnTime: 'समय पर डिलीवरी',
    repQuality: 'ग्रेड-ए क्वालिटी',
    repBadgesTitle: 'सत्यापित कृषि प्रमाणपत्र व उपलब्धियां',
    repRecentTitle: 'हाल ही में पूरे किए गए सफल सौदे',
    repZeroDefault: 'पिछले 4 वर्षों में 0% डिफ़ॉल्ट का शानदार रिकॉर्ड'
  }
};

export const stageTranslations: Record<
  string,
  { en: { label: string; desc: string }; hi: { label: string; desc: string } }
> = {
  DEMAND_POSTED: {
    en: { label: 'Crop Listed', desc: 'Pre-orders open to buyers' },
    hi: { label: 'फसल दर्ज', desc: 'खरीदारों के लिए बुकिंग खुली' }
  },
  FARMER_COMMITTED: {
    en: { label: 'Buyers Locked', desc: 'Sowing scheduled & confirmed' },
    hi: { label: 'सौदा पक्का', desc: 'बुवाई की तारीख तय व पक्की' }
  },
  CULTIVATION: {
    en: { label: 'Sowing Started', desc: '30% advance capital released' },
    hi: { label: 'बुवाई शुरू', desc: 'खाद-बीज हेतु 30% अग्रिम पैसा जारी' }
  },
  GROWING: {
    en: { label: 'Crop Growing', desc: 'Field & crop monitored' },
    hi: { label: 'फसल बढ़वार', desc: 'सिंचाई व बढ़वार की निगरानी' }
  },
  HARVEST_READY: {
    en: { label: 'Harvest Ready', desc: 'Crop mature for harvesting' },
    hi: { label: 'फसल तैयार', desc: 'कटाई हेतु पूर्ण तैयार' }
  },
  HARVESTED: {
    en: { label: 'Harvested', desc: 'Weighed & packed at farm gate' },
    hi: { label: 'कटाई पूर्ण', desc: 'खेत पर वजन व पैकिंग संपन्न' }
  },
  QUALITY_VERIFIED: {
    en: { label: 'Quality Verified', desc: 'Grade-A lab certificate' },
    hi: { label: 'गुणवत्ता पास', desc: 'ग्रेड-ए गुणवत्ता प्रमाणित' }
  },
  IN_TRANSIT: {
    en: { label: 'Dispatched to Hub', desc: 'En route in logistics corridor' },
    hi: { label: 'हब रवाना', desc: 'गाड़ी वेयरहाउस की ओर निकली' }
  },
  AT_DARK_STORE: {
    en: { label: 'At Warehouse', desc: 'Safely arrived at local hub' },
    hi: { label: 'वेयरहाउस पहुंचा', desc: 'लोकल हब में सुरक्षित भंडारण' }
  },
  OUT_FOR_DELIVERY: {
    en: { label: 'Out for Delivery', desc: 'Dispatched for customer delivery' },
    hi: { label: 'वितरण रवाना', desc: 'ग्राहक तक पहुंचाने हेतु रवाना' }
  },
  DELIVERED: {
    en: { label: 'Delivered', desc: 'Received by customers/buyers' },
    hi: { label: 'डिलीवरी पूर्ण', desc: 'खरीदार को आपूर्ति पूरी' }
  },
  SETTLED: {
    en: { label: 'Fully Settled', desc: 'Remaining 70% payment disbursed' },
    hi: { label: 'पूरा भुगतान', desc: 'शेष 70% पैसा सीधे बैंक खाते में' }
  }
};
