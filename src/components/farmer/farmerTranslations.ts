export type FarmerLang = 'en' | 'hi';

export const farmerTranslations = {
  en: {
    // Header
    farmerTitle: 'Verified Farmer',
    location: 'Ludhiana, Punjab • Punjab Agricultural Zone',
    reputationScore: 'Trust Score',
    completedHarvests: 'Completed Harvests',
    fulfillmentRate: 'Successful Deliveries',
    scoreExcellent: '⭐ Top-Rated Trusted Farmer',
    viewReputation: 'View Trust Card',
    createListing: 'Add New Harvest',

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
    activeContract: 'Active Crop',
    harvestDateLabel: 'Harvest Date',
    assignedHubLabel: 'Assigned Godown / Hub',
    simulateYieldBtn: 'Report Crop Shortfall',
    auditContractBtn: 'View Sale Agreement',

    // 6 Metrics
    totalQuantity: 'Expected Harvest',
    totalQuantitySub: 'Total Crop Yield',
    committedDemand: 'Pre-Booked by Buyers',
    committedDemandSub: 'Already Sold',
    remainingAvailable: 'Available to Sell',
    remainingAvailableSub: 'Open for Buyers',
    guaranteedPrice: 'Guaranteed Price',
    guaranteedPriceSub: 'Fixed Rate (No Haggling)',
    activeBuyers: 'Confirmed Buyers',
    activeBuyersSub: 'Money Safe in Bank',
    expectedRevenue: 'Total Expected Income',
    expectedRevenueSub: '100% Guaranteed Payment',

    // Progress Bar
    progressLabel: 'Buyer Pre-Booking Progress',
    escrowSecured: 'Secured in Bank',
    advanceCapitalNotice: '🎉 Good News: ₹1,950 Advance Money unlocked for seeds & fertilizer! (₹6,500 safely deposited in bank)',
    awaitingCommitments: 'Awaiting buyer bookings to unlock 30% advance money.',

    // Lifecycle Stepper
    lifecycleTitle: 'Crop Growth & Payment Steps',
    lifecycleSubtitle: 'Update each milestone as your crop grows. Verified steps release payment directly into your bank account.',
    nextStageButton: 'Advance to',
    phaseLabel: 'Step',

    // Other Listings
    allListingsTitle: 'All Active Crop Listings',
    committedLabel: 'Pre-Booked',
    targetLabel: 'Target',
    harvestLabel: 'Harvest Date',

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
    createModalTitle: 'Add New Future Crop Harvest',
    createModalSubtitle: 'Lock guaranteed pre-orders and seed money before planting',
    cropLabel: 'Select Crop',
    varietyLabel: 'Seed Variety / Name',
    quantityLabel: 'Expected Harvest (kg)',
    priceLabel: 'Guaranteed Price (₹ / kg)',
    harvestDateInputLabel: 'Expected Harvest Date',
    locationLabel: 'Farm Location / District',
    descriptionLabel: 'Farming Practice & Soil Notes',
    estRevenueLabel: 'Total Expected Income',
    upfrontCapitalLabel: 'Upfront Advance for Seeds & Growing',
    advancePctLabel: 'Upfront Capital for Growing (% of Pre-Commitment)',
    advancePctHelper: 'Percentage of pre-order funds released upfront upon sowing for seeds, fertilizer & preparation',
    viewDetailsTab: 'Hover or click for full crop details',
    viewDetailsBtn: 'View Details',
    hideDetailsBtn: 'Close',
    contractRefLabel: 'Contract ID',
    escrowProtectedLabel: '100% Bank Escrow Protected',
    selectToManage: 'Manage on Dashboard',
    createSubmitBtn: 'Publish Crop & Get Buyers',

    // Yield Simulator Modal
    simModalTitle: 'Crop Shortfall & Weather Risk Settlement',
    simModalSubtitle: 'Fair, transparent payout if drought or weather lowers harvest yield',
    simActualYield: 'Actual Harvest (kg)',
    simFarmerPayout: 'Farmer Final Payment',
    simFarmerPayoutDesc: 'Full agreed price paid for all harvested quantity',
    simBuyerRefund: 'Buyer Refund',
    simBuyerRefundDesc: 'Automatic refund for shortfall quantity not produced',
    simFormulaTitle: 'Automated Fair Settlement Formula',
    simSet700: 'Set 700 kg (Example Shortfall)',
    simExecuteBtn: 'Apply Settlement',

    // Reputation Modal
    repModalTitle: 'Farmer Trust & Scorecard',
    repModalSubtitle: 'Verified record based on successfully fulfilled harvests',
    repTierBadge: 'Tier 1 Trusted Farmer',
    repCompleted: 'Completed',
    repFulfillment: 'Fulfillment',
    repOnTime: 'On-Time Delivery',
    repQuality: 'Quality Pass',
    repBadgesTitle: 'Verified Agricultural Certifications',
    repRecentTitle: 'Recent Completed Harvests',
    repZeroDefault: 'Zero defaults across 4 years of forward farming'
  },
  hi: {
    // Header
    farmerTitle: 'सत्यापित किसान',
    location: 'लुधियाना, पंजाब • उपजाऊ कृषि क्षेत्र',
    reputationScore: 'भरोसा स्कोर',
    completedHarvests: 'सफल फसलें',
    fulfillmentRate: 'सफल डिलीवरी',
    scoreExcellent: '⭐ शीर्ष 5% भरोसेमंद किसान',
    viewReputation: 'विश्वास कार्ड देखें',
    createListing: 'नई फसल जोड़ें',

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
    activeContract: 'सक्रिय फसल',
    harvestDateLabel: 'कटाई का समय',
    assignedHubLabel: 'गोदाम / वेयरहाउस',
    simulateYieldBtn: 'फसल नुकसान रिपोर्ट',
    auditContractBtn: 'बिक्री समझौता देखें',

    // 6 Metrics
    totalQuantity: 'कुल अनुमानित उपज',
    totalQuantitySub: 'अपेक्षित पैदावार',
    committedDemand: 'पहले से बिकी फसल',
    committedDemandSub: 'खरीदारों द्वारा बुक',
    remainingAvailable: 'बिक्री हेतु शेष',
    remainingAvailableSub: 'खरीदारों के लिए खुली',
    guaranteedPrice: 'तयशुदा पक्का भाव',
    guaranteedPriceSub: 'गारंटीड रेट (कोई मोलभाव नहीं)',
    activeBuyers: 'पक्के खरीदार',
    activeBuyersSub: 'पैसा बैंक में सुरक्षित',
    expectedRevenue: 'कुल संभावित कमाई',
    expectedRevenueSub: '100% सुरक्षित भुगतान',

    // Progress Bar
    progressLabel: 'खरीदारों द्वारा अग्रिम बुकिंग',
    escrowSecured: 'बैंक में सुरक्षित राशि',
    advanceCapitalNotice: '🎉 शुभ समाचार: बीज, खाद और जुताई के लिए ₹1,950 (30% अग्रिम राशि) आपके लिए स्वीकृत! (कुल ₹6,500 बैंक में सुरक्षित)',
    awaitingCommitments: 'अग्रिम राशि प्राप्त करने के लिए खरीदार की बुकिंग की प्रतीक्षा है।',

    // Lifecycle Stepper
    lifecycleTitle: 'फसल बढ़वार एवं भुगतान चरण',
    lifecycleSubtitle: 'आप हर कदम की स्थिति दर्ज करें। हर चरण पूरा होने पर पैसा सीधे आपके बैंक खाते में भेजा जाता है।',
    nextStageButton: 'आगे बढ़ाएं:',
    phaseLabel: 'चरण',

    // Other Listings
    allListingsTitle: 'आपकी अन्य सभी सक्रिय फसलें',
    committedLabel: 'बुक हुई',
    targetLabel: 'लक्ष्य',
    harvestLabel: 'कटाई तारीख',

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
    varietyLabel: 'बीज की किस्म / नाम',
    quantityLabel: 'अपेक्षित पैदावार (किलो)',
    priceLabel: 'मांग का तय भाव (₹ प्रति किलो)',
    harvestDateInputLabel: 'कटाई की अनुमानित तारीख',
    locationLabel: 'खेत का स्थान / जिला',
    descriptionLabel: 'खेती का तरीका व मिट्टी विवरण',
    estRevenueLabel: 'कुल संभावित कमाई',
    upfrontCapitalLabel: 'बुवाई व खाद-बीज हेतु अग्रिम राशि',
    advancePctLabel: 'बुवाई व खाद-बीज हेतु अग्रिम पूंजी (% अनुपात)',
    advancePctHelper: 'बुवाई के समय खाद, बीज और खेत तैयारी के लिए सीधे मिलने वाली अग्रिम राशि का प्रतिशत',
    viewDetailsTab: 'पूरा विवरण देखने के लिए होवर या क्लिक करें',
    viewDetailsBtn: 'विवरण देखें',
    hideDetailsBtn: 'बंद करें',
    contractRefLabel: 'अनुबंध आईडी',
    escrowProtectedLabel: '100% बैंक एस्क्रो द्वारा सुरक्षित',
    selectToManage: 'डैशबोर्ड पर सक्रिय करें',
    createSubmitBtn: 'फसल दर्ज करें व खरीदार पाएं',

    // Yield Simulator Modal
    simModalTitle: 'फसल नुकसान एवं सूखा जोखिम निपटान',
    simModalSubtitle: 'यदि सूखा या मौसम से फसल कम होती है, तो बैंक निष्पक्षता से किसान और खरीदार दोनों का हिसाब करता है',
    simActualYield: 'वास्तविक कटाई उपज (किलो)',
    simFarmerPayout: 'किसान को मिलने वाला भुगतान',
    simFarmerPayoutDesc: 'जितनी फसल निकली, उसका तयशुदा भाव पर पूरा भुगतान',
    simBuyerRefund: 'खरीदार को रिफंड राशि',
    simBuyerRefundDesc: 'जो फसल नहीं उग सकी, उसका पैसा खरीदार को तुरंत वापस',
    simFormulaTitle: 'स्वचालित निष्पक्ष निपटान फॉर्मूला',
    simSet700: '700 किलो सेट करें (उदाहरण)',
    simExecuteBtn: 'निपटान लागू करें',

    // Reputation Modal
    repModalTitle: 'किसान साख व स्कोरकार्ड',
    repModalSubtitle: 'पिछली सफल फसलों और समय पर आपूर्ति का सत्यापित डिजिटल रिकॉर्ड',
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
