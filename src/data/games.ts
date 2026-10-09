export interface WalkthroughStep {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  video?: string;
  videoPoster?: string;
  videoTitle?: string;
  hasSpoiler?: boolean;
  spoilerText?: string;
}

export interface WalkthroughSection {
  id: string;
  title: string;
  video?: string;          // Direct video URL or 'placeholder'
  videoPoster?: string;    // Poster image URL
  videoTitle?: string;     // Title for section video
  steps: WalkthroughStep[];
}

export interface Game {
  id: string;
  title: string;
  developer: string;
  gameLink?: string;
  category: string;
  description: string;
  editorNote?: string;
  accentColor: string;
  coverImage: string;
  coverImages?: string[];  // Multiple cover images for automatic looping carousel
  coverAlt: string;
  video?: string;          // Direct video URL or 'placeholder'
  videoPoster?: string;    // Poster image URL
  videoTitle?: string;     // Title or badge for the walkthrough video
  walkthrough: WalkthroughSection[];
}

export const categories = [
  "All",
  "Cozy Games",
  "Puzzle",
  "Organization",
  "Life Sim",
];

export const games: Game[] = [
  {
    "id": "game-1788884146129",
    "title": "Librarian: Tidy Up the Arcane Library!",
    "category": "Cozy Games",
    "coverAlt": "Placeholder cover",
    "gameLink": "https://store.steampowered.com/app/4197610/Librarian_Tidy_Up_the_Arcane_Library/",
    "developer": " ArtRising",
    "coverImage": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/b992ec68-feab-4042-8897-a46f4bdd6d1a-afjhaisluefglsd.jpg_2K_202609090013.jpeg",
    "coverImages": [
      "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/b992ec68-feab-4042-8897-a46f4bdd6d1a-afjhaisluefglsd.jpg_2K_202609090013.jpeg",
      "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/2667192b-5b84-403b-80b5-c343ef3c65e2-chaos.jpeg"
    ],
    "editorNote": "Restoring this library has been such a satisfying journey from start to finish. What began as overwhelming chaos — books scattered everywhere, shelves empty and rooms in disarray — slowly transformed into something beautiful, one book and one shelf at a time. There’s a quiet, wonderful joy in carefully matching each volume to its proper room, watching the spines line up perfectly by color and subject, and seeing the grand hall slowly come back to life.\nThis game isn’t just about sorting books. It’s about the satisfaction of patience, the pleasure of organization, and that wonderful feeling when everything finally clicks into place. It proves that with care and attention, even the greatest mess can become something truly perfect.\nFrom the first book picked up to the very last one placed on the shelf, it was a relaxing, rewarding experience. The Arcane Library stands whole and beautiful once again — and that feeling of turning chaos into perfection? I highly recommend this game to anyone. If you love cozy, satisfying sorting games that leave you feeling peaceful and proud, this one is absolutely worth playing. ✨📚",
    "accentColor": "#cc5c28",
    "description": "Librarian: Tidy Up the Arcane Library! is a single-player simulation. You need return scattered books to proper places in an Arcane Library. As completed rows of bookshelves, you can learn ability to improve your efficiency. Use your skills and strategies to shelve 3,072 books as quick as you can.",
    "walkthrough": [
      {
        "id": "section-1788884865249",
        "steps": [
          {
            "id": "step-1788884885837",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/2667192b-5b84-403b-80b5-c343ef3c65e2-chaos.jpeg",
            "title": "How It Works",
            "imageAlt": "Step illustration",
            "description": "🔍 Pick up a book — check the spine, title, colors, and symbols\n📖 Read the clues — subject, magic school, era, color, and emblem tell you which shelf it belongs to\n🧩 Place it on the matching shelf — every shelf is labeled by Subject / Category\n✅ Confirm it sticks — correct placement = will glow; wrong shelf = it won't\n💡 No time limit! Relax, take your time, and enjoy sorting at your own pace"
          }
        ],
        "title": "Getting Started & Mechanics"
      },
      {
        "id": "section-1788885760578",
        "steps": [
          {
            "id": "step-1788885855445",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/a4c4f6a7-966e-4005-bace-17d912f8122b-1st-A.png",
            "title": "1A - Monsterology",
            "imageAlt": "Step illustration",
            "description": "📍10 VOLUMES\n\n•A Field Guide to Monster: Identification and Survival\n•A Pictorial Guide to the Ecology of Monsters\n•Behavioral Patterns of Monsters\n•Ecological Pyramid of Monsters\n•Magical Creatures and Their Spells\n•Living with Monsters: A Guide to Care and Training\n•Monster Field Notes: A Beastmaster's Journey\n•Monsterology: An Introduction to Forbidden Beast\n•Monsterology: Language and Vocal Patterns of Monsters\n•Tears of the Beasts: Records of the Extinct and Forgotten\n•The Illustrated Beastiary: Creatures of Land, Sky, and Sea\n•The World Encyclopedia of Dragons"
          },
          {
            "id": "step-1788886060746",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/9d2f026d-7ec9-45e4-b66f-f94a5b54b7e5-1st-B.png",
            "title": "1B - Astrology and Divination",
            "imageAlt": "Step illustration",
            "description": "📍10 VOLUMES\n\n•Animal Oracles: Prophesying Match Results\n•Apocalypse of the Heavens: Omens and Warnings\n•Books of Constellations: The Thirteen Zodiac Signs that Guide Destiny\n•One Right Guess in a Hundred Makes a Seer\n•Prophecy: Angelic Self-Writing\n•Prophecy by the Three Witches\n•Prophecy of the Advent of the Great King of Terror\n•The Abyss of Tarot: A Book of Symbols and Intuation\n•The Art of Feng Shui: Reading Dragon Veins and Increasing  Luck\n•The Crystal Tome: Practical Scrying and Clairvoyance\n•The Seer's Journal: Daily Visions of the Future\n•Voices of the Oracle: Revelation for the Chosen Listener"
          },
          {
            "id": "step-1788886157195",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/6a9efe61-e4dc-4837-8e7b-c6f19385d843-1st-C.png",
            "title": "1C - Curses and Divination",
            "imageAlt": "Step illustration",
            "description": "📍10 VOLUMES\n\n•Seal and Sever: Lost Rites of Curse-Breaking\n•The Countercurse Compendium: Magic that Bites Back\n•The Dark Pact: The Birth of a Curse\n•The Grand Compendium of Curses: 100 Hexes and 100 Dispells\n\n📍3 VOLUMES\n\n•Advanced Curse Analysis: Multiple Structures and Dissolution Process\n•Breaking the Curse of the Trophyless\n•Curse-Breaking Arithmancy and Sealing Arts\n•Introduction to Malediction Systems: Taxonomy, Structure, and Mechanisms\n•Reverse Ritual Tracing for Curse Source Identification\n•The Book of Curses: Forgotten Plagues and Their Dispells\n•The Death's Note\n•The Lexicon of Curses: Melefic Words and Their Power"
          },
          {
            "id": "step-1788887231037",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/42b4e993-dbf0-40d3-8ee8-acf516918782-1st-D.png",
            "title": "1D - Bard and Music",
            "imageAlt": "Step illustration",
            "description": "📍10 VOLUMES\n\n•A Collection of Chanted Verses: Status Buffing and Nerfing\n•Spell Chanting Technique: The Blending of Sound and Spell\n•The Chronicle of World Music of Magic\n•The Dark Sonata: Music That Attracts Calamity\n\n📍3 VOLUMES\n\n•Chanting Methods of Resonating with Natural Entities\n•Magical psalms: Methodology for Compiling Chanted Poetry\n•Musical Saint: A Great Figure Who Bought Music to the Masses\n•The Bard's Book of Spells\n•Theory of Chanting: Principles of Mana Amplification via Voice\n•Theorotical Foundations of Enchanted Music\n•Transcendental Magic Etudes of Execution\n•Witche's Hymnal"
          },
          {
            "id": "step-1788887580064",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/be27c2b8-81b5-4a89-9742-23b844591699-1st-E.png",
            "title": "1E - Necromancy",
            "imageAlt": "Step illustration",
            "description": "📍10 VOLUMES\n\n•A Technique to Turn Wandering Ghost into Servants\n•Compendium of Necromancy: The Arts of Management and Maintenance\n•Compendium of Necromancy: The Beginner's Guide\n•Foundations of Necromancy: On the Fixation and Severance of Souls\n•How to Command the Army of the Dead\n•Necrodefence Compendium: Dealing with Hauntings\n•Night Parade of One Hundred Demons\n•Practical Necromancy: Skeleton Edition\n•Ritual Design Guidelines for the Practicing Necromancer\n•Rituals of Calling and Commanding the Dead\n•Theory of the Nether Strata: Analysis of the Afterworld\n•Zombie: The Secret Rituals for Domination"
          },
          {
            "id": "step-1788887665477",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/dccb33d7-2e9b-48f9-81d2-2c902e8542e6-1st-F.png",
            "title": "1F- Transfiguration",
            "imageAlt": "Step illustration",
            "description": "📍10 VOLUMES\n\n•Beastification and the Threshold of Madness\n•Complete Practical Transfiguration: Phases and Sustaining Techniques\n•Correlation of Transformation Duration and Mana Deplation\n•Foundations of Transformation: Object Alteration and Reassembly\n•Humanization: A Transformation Guide for Non-Humans\n•Introduction to Inanimate Transfiguration\n•Introduction to the Theory of Transfiguration\n•Magical Physiology of Therianthropy\n•Mastery of Mimicry: Theory and Practice of Visual Imitation\n•Preservation of Mental Identity in Therianthropic Spells\n•Reducing Metamophosis Time: How to Minimize Vulnerability\n•The Codex of Transfiguration: Detection and Nullification"
          },
          {
            "id": "step-1788887785016",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/86a01c01-b86d-472f-ab10-b2afa6cae913-1st-G.png",
            "title": "1G - Magical Artifacts and Enchanting",
            "imageAlt": "Step illustration",
            "description": "📍10 VOLUMES\n\n•Foundations of Magical Item Crafting and Materials\n•Magical item's Workshop Series\n•Practical Enchantment: Offense and Defense Enchantment\n•The Grand Encyclopedia of Magical Artifacts\n\n📍3 VOLUMES\n\n•Artifacts That Change the World\n•Compendium of Forbidden Relics\n•Crystal Catalog: Elemental Properties and Enchantment Mastery\n•Forging Magical Items\n•Introduction to Enchantment Theory\n•Repair and Returning of Enchanted Gear\n•The Inverse Law of High Grade Armor and Fabric Coverage\n•The Magic Ring That Steals Reasons"
          },
          {
            "id": "step-1788888048900",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/b80e7557-1667-437f-a296-bf6dd13763cc-1st-H.png",
            "title": "1H - Stealth",
            "imageAlt": "Step illustration",
            "description": "📍10 VOLUMES\n\n•Codex of the Stealth Arts\n•Complete Guide to Stealth Magic\n•Hide and Seek: Magical Warfare of Stealth and Detection\n•Stealth Techniques: Concealment Among Nearby Objects\n\n📍3 VOLUMES\n\n•Foundations and Applications of Invisibility Magic\n•Introduction to Stealth Magic: The Art of Shadowing\n•Shadowmages: Shadow Cloning and Teleportation\n•Stealth Arts: Techniques to Becoming Air\n•Tactics of the Bucket: Vision-Sealing Theft\n•The Art of Hiding One's Presence\n•The Art of Shadow Walking\n•The Book of Ninja: Lurking in the Darkness"
          },
          {
            "id": "step-1788888459506",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/feb9e4cf-f240-4d06-811f-d339a3330a68-1st-i.png",
            "title": "1I - Illusion Magic",
            "imageAlt": "Step illustration",
            "description": "📍10 VOLUMES\n\n•Chronostatic Illusions: Manipulating the Perception of Time\n•Crafting Visual and Auditory Illusions\n•Enchanting Illusions: Seduction Magic\n•Illusion Magic: The Art of Hypnosis\n•Introduction to Illusion Magic: Truths of the Imaginary\n•Terror Illusions: Spells to Shatter the Enemy's Mind\n•The Art of Illusion Defense: Mental Defences and Protection of the Five Senses\n•The Grand Compendium of Illusion Magic\n•The Illusory Art: Sovereignty Over the Five Senses\n•The Infinite Hall: Creating Inescapable Illusory Spaces\n•The Ultimate illusion: Mirror Flower, Water Moon\n•Where Illusion Ends and Reality Begins"
          },
          {
            "id": "step-1788888568489",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/1d43a0d4-728d-4da2-885f-acb5a659b4ee-1st-J.png",
            "title": "1J - Summoning Magic",
            "imageAlt": "Step illustration",
            "description": "📍10 VOLUMES\n\n•A Beginner's Guide: Summoning the Useless Goddess\n•Divine Dragon Summoning: Descent of Bahamut\n•Encyclopedia of 10,000 Summons: The Complete Collection From Heaven to the Abyss\n•Introduction to summoning: Fundamentals of Otherworldly Contracts\n•Magic Circles and Summoning Syntax Explained\n•Succubus Summoning Techniques and Practical Applications\n•Summoning and Controlling Catasthropic Entities\n•Summoning Magic for Beginners\n•The Book of Summoning and Contracts\n•The Complete Summoning Grimoire\n•Theory and Practice of Hero Summoning From Another World\n•Trans-Temporal Summons and the Law of Causality"
          },
          {
            "id": "step-1788888654159",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/09cf2b1f-b3ec-4493-a486-0642896b291c-1st-K.png",
            "title": "1K - Healer and Healing Magic",
            "imageAlt": "Step illustration",
            "description": "📍10 VOLUMES\n\n•Advanced Healing Theory: Maintaining Vigor Until Daybreak\n•Fundamentals of Healing and Mana Control\n•Healing Magic for the Reclamation of Mind and Conciousness\n•Introduction to Magical Healing\n•No More \"Healer Diff\": A Comprehensive Guide\n•Spells for Curing Poisons and Diseases\n•The Four Principles of the Healer's Ethics\n•The Grand Compendium of Healing Magic"
          },
          {
            "id": "step-1788888720230",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/64f7bbf0-e3bf-46ad-96ae-2f016f1f695e-1L.png",
            "title": "1L - Holy Magic",
            "imageAlt": "Step illustration",
            "description": "📍10 VOLUMES\n\n•Compendium of Sacred Purification Magic\n•Formation and Maintenance of Large Sacred Barriers\n•Fundamentals of Holy Power in Undead Annihilation\n•Holy Magic: Undead Protection and Purification\n•Prolegomena to Holy Magic Theory\n•Selection and Application of Targets for Holy Magic\n•Spells of Holy Light for Concealing Vital Areas\n•Theological Research on Holy Magic"
          },
          {
            "id": "step-1788888846724",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/074d6dec-072c-4ac6-98ff-c128bb33eb53-1st-M.png",
            "title": "1M - Destruction Magic",
            "imageAlt": "Step illustration",
            "description": "📍10 VOLUMES\n\n•Book Of Spells: Dimention Rift - Expert\n•Book Of Spells: Earth - Novice\n•Book Of Spells: Fire - Novice\n•Book Of Spells: Fluid - Expert\n•Book Of Spells: Forest Creation - Expert\n•Book Of Spells: Ice - Adept\n•Book Of Spells: Light - Adept\n•Book Of Spells: Pulverization - Expert\n•Book Of Spells: Shadow - Adept\n•Book Of Spells: Thunder - Adept\n•Book Of Spells: Water - Novice\n•Book Of Spells: Wind - Novice\n\n📍5 VOLUMES\n\n•Book Of Spells: Abyss - Master\n•Book Of Spells: Energy - Legendary\n•Book Of Spells: Explosion - Legendary\n•Book Of Spells: Gravitation - Master\n•Book Of Spells: Matter Creation - Master\n•Book Of Spells: Psychokinesis - Master\n•Book Of Spells: Space- Legendary\n•Book Of Spells: Time - Legendary"
          },
          {
            "id": "step-1788889450995",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/feb8a8fe-5069-4b6b-a23b-12a234e1183b-1st-N.png",
            "title": "1N - Alchemy and Potion-Making",
            "imageAlt": "Step illustration",
            "description": "📍10 VOLUMES\n\n•Alchemy Codex: An Introduction to Herbology\n•Books of Alchemy: A Practical Guide to Potion Crafting\n•Books of Alchemy: Encyclopedia of World Potions\n•Books of Alchemy: Homunculus - Chronicle of the Forbidden Creation \n•Books of Alchemy: Potion Safety and Storage Manual\n•Books of Alchemy: Practical Extraction of High-Purity Essences\n•Books of Alchemy: The Laws and Taboos of Chimera Synthesis\n•Books of Alchemy: The Little Herbology of the Faefolk\n•Books of Alchemy: The Ultimate Secret of the Philosopher's Stone\n•Forbidden Alchemy: The Guide to Toxin Brewing and Disposal\n•The Alchemist's Encyclopedia: Categories and Efficacy of Ingredients\n•The Alchemist's Field Guide: Natural Materials and Foraging\n\n📍5 VOLUMES\n\n•Tomes of Alchemy: A Beginner's Guide to Modern Synthesis\n•Tomes of Alchemy: A Grimoire of Elemental Fusion and Fission\n•Tomes of Alchemy: Alchemical Safety Manual Handling Hazardous Materials\n•Tomes of Alchemy: Alchemical Tools and Laboratory Apparatus\n•Tomes of Alchemy: Beginner Manual of Alchemical Synthesis\n•Tomes of Alchemy: Complete Theory of Elemental  Transmutation\n•Tomes of Alchemy: The Alchemical Art of Transmuting Food to Poop\n•Tomes of Alchemy: The Great Compendium of Synthesis Recipes"
          }
        ],
        "title": "Master List By Shelf (First Floor)"
      },
      {
        "id": "section-1788891040672",
        "steps": [
          {
            "id": "step-1788891328964",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/5ff3e24c-d9fd-4144-96a8-ccc62f0e6cac-2nd-A.png",
            "title": "2A - Warrior",
            "imageAlt": "Step illustration",
            "description": "📍10 VOLUMES\n\n•Armor and Muscle: Synergy Between Body and Steel\n•Battlefield Logic: A Tactical Guide For Warriors\n•Blade: Dimension Slash Combat Technique\n•Heretic Blade Arts: Three Sword Style\n•Mind Like Still Water: The Zen of Perfect Parrying\n•Scion of the Axe God: Strongest Warrior Chosen by the Sun\n•Sword Saint: The One Who Sliced the Mountains\n•The Dark Berserker and the Greatsword\n•The Supreme Creed: The Naked Warrior\n•The Warrior's Creed: Only Cowards Become Long-Range Mages\n•The Weapon Compendium: Use of Swords, Axes, and Spears\n•Warrior's Foundation: Between Blade and Spell"
          },
          {
            "id": "step-1788891754797",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/507e9d4a-ff03-42dd-a1fc-601d468e6329-2nd-B.png",
            "title": "2B - Archery",
            "imageAlt": "Step illustration",
            "description": "📍10 VOLUMES\n\n•Anatomy of the Bow and Arrow\n•Applied Archery Tactics: Arrows of Stillness and Motion\n•Archers of the Fairies Pact\n•Arrow of the Shattered Knee\n•From Longbow to Shortbow: Tactical Application\n•Forging and Using Magical Bows\n•Stellar Archery: Resonance of Stars and Arrows\n•The Art of the Arrow Series\n•The Book of Arcane Bows: Magic Infused Arrows\n•The Fundamentals of Archery: Spirit and Skill \n•The Grand Compendium of Archery\n•The Hunter's Archery Manual"
          },
          {
            "id": "step-1788891989462",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/6abb7208-4699-4a6a-9073-762bd0732f1d-2nd-C.png",
            "title": "2C - Daily Magic",
            "imageAlt": "Step illustration",
            "description": "📍10 VOLUMES\n\n•1000 Easy Spells to Use at Home\n•A Compendium of Useless Magic from Around the World\n•Introduction to Lifehack Magic\n•Magic Techniques to Boost Household Efficiency\n•Minor Repairs: Practical Everyday Magic\n•The Complete Guide to Everyday Magic: Simple Life Enchantments\n\n📍3 VOLUMES\n\n•Broom Handling Techniques: The Art of Aerial Travel\n•Compendium Magic for the Lazy\n•Everyday Magic for Deep and Restful Sleep\n•Handy Kitchen Magic Recipes\n•Home Magic: Spells to Protect and Nurture Your Dwelling\n•How to Commute with Magic\n•Magic to Mute a Specific Person's Voice\n•Magic to Speak and Convey\n•Spoiler Prevention Magic\n•Storage Magic: Different Dimension Pocket\n•Three Seconds to Office: Magic for Last-Minute Commuters\n•What Kind of Magic Works Best for Job Hunting?"
          },
          {
            "id": "step-1788892573245",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/f53c9eac-3574-4a96-9cf1-45d3585e1919-2nd-D.png",
            "title": "2D - Mathematics",
            "imageAlt": "Step illustration",
            "description": "📍10 VOLUMES\n\n•Easy Math! Magical Representation Theory for a 3-Year Old\n•Introduction to Sorcery Mathematics\n•Mana Measurement and Conversion Equations\n•Structural Analysis of Sorcerous Equations\n•The Mathematical Geometry of Magic\n•Theory of Everything: Grasping Beautiful Theory Through Equations\n\n📍3 VOLUMES\n\n•Arcane Glyphs and Pattern Theory\n•Genesis Theory: An Interpretation Via Imaginary Numbers\n•Magical Analysis Based on the Application of Infinite Series\n•Mass-Mana Equivalence\n•Mathematical Methods for Constructing Magic Circles\n•Prime Equation: The Absolute Order Hidden Behind Irregulaty\n•Prophecy and Probability Theory\n•Qualification of Cursed Power and Constraint Conditions\n•Spatial Distribution of Mana Density and Its Fluctuation Characteristics\n•Temporal Magic and Chaos Theory\n•The Law of Equivalent Exchange\n•Vector Space Theory of Magic"
          },
          {
            "id": "step-1788893013084",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/55778bf1-5f36-421c-9407-07fb4553ff82-2nd-E.png",
            "title": "2E - Art",
            "imageAlt": "Step illustration",
            "description": "📍10 VOLUMES\n\n•Art and Magic Circles: Definitions and Differences\n•Art Collection That No One Can Understand\n•Art is Sublime Because It Has No Answer\n•Drawing Moving Characters: Beginner Level\n•How to Change Drawn Art Into Reality\n•Introduction to Magical Art\n•Living Paintings: Creating and Controlling Animated Magical Art\n•Memory Transfer: The Technique of Direct Scene Depiction from Your Brain\n•Perfect Lines and Circles: The Secret to Drawing in One Stroke\n•Process: Sublimating Brain Fragments Into Works\n•Puppet Crafting: An Introductory Guide to Automata and Statues\n•Techniques for Returning a Drawing to a Previous Step"
          },
          {
            "id": "step-1788893439370",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/b497f921-51f5-4139-8c79-99cb302e9f77-2nd-F.png",
            "title": "2F - Management",
            "imageAlt": "Step illustration",
            "description": "📍10 VOLUMES\n\n•Conflict Protocols for Guilds\n•Guild Treasury and Reward System Management \n•Licensing and Regulation of Magic Users\n•Magical Supply Chain Management\n•Management: Administration of Magical Institutions\n•Management: High-Ranking Magician Training and Evaluation System\n•Management: Mana Resource Allocation and Optimization \n•Management: Tactical Command of Magical Forces\n•Managing Diverse and Cross-Race Adventurer Parties\n•Organizational Discipline: How Small Cracks Lead to Great Ruin\n•Research of Adventurer Party Tactics Series\n•System for Nurturing and Promotions in Guilds"
          },
          {
            "id": "step-1788893797259",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/422848b3-387b-4896-bbd9-9ca7c792d424-2nd-G.png",
            "title": "2G - Economics",
            "imageAlt": "Step illustration",
            "description": "📍10 VOLUMES\n\n•An Introduction to Magical Economics\n•Arcane Economy Report: Regional Mana Market Analysis\n•Economics: Wage Structures in the Magical Profession\n•Introduction to Arcane Market System\n•Magic and Value: Arcane Resource Valuations\n•Mana Currency Systems and Their Evolution\n\n📍3 VOLUMES\n\n•Alchemy and Inflation: The Gold Collapse\n•Economics: Supply and Trade of Arcane Resources\n•Economics: The Lost Three Decades\n•Economics: The revolution in Logistics Through Teleportation\n•Economics: Where did the Taxes Go?\n•Financial: The Art of the Tariff\n•History of Demonic Financial Hegemony\n•Studies in Arcane Fiscal Theory\n•The Arcane Black Market and Price Manipulation\n•The Complete Works of Magical Economics\n•Spell Patterns and IP Rights\n•Why do Stocks Crash the Moment I Buy Them?"
          },
          {
            "id": "step-1788894929073",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/10f2bcfd-0f03-44db-a1af-889029c91133-2nd-H.png",
            "title": "2H - Sociology",
            "imageAlt": "Step illustration",
            "description": "📍10 VOLUMES\n\n•Career Opportunity: Graduated from Magic University... Got Zero Job Offers\n•Interracial Social Dynamics\n•Job Inequality: Low Salary Even as a Licensed Sage\n•Labor Studies: Even with Magic, Overtime Never Ends\n•The Influence of Short-Lived Cultures on Longlived Species\n•Work Culture: The Mage Who Changed Jobs to a Sweatshop\n\n📍3 VOLUMES\n\n•A Media Society Manipulated by Magic\n•How to Survive a Mana-Disparity Society\n•Labor Studies: Where are the Workplaces to Apply Your University-Learned Magic?\n•\"Low Mana” a Form of Discrimination?\n•Mana and Labor: Sociology of Magical Economies\n•Marriage is a Contract Spell: Advanced Disenchantment is Required for Divorce\n•Social Structures of Magical Civilizations\n•Sociology: Mage Pension System on the Brink of Collapse\n•The Labor Reality of Magers: Unpaid and Unprotected Interns\n•The Rift in Values Between Different Species with Differing Lifespans\n•The Structure of Power Monopolization Tendencies by Long-Lived Species\n•Wage Gaps: Universal Mana Income for Mages Now!"
          },
          {
            "id": "step-1788895555411",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/51658bdd-ab15-4434-a547-40a89bbc323f-2nd-i.png",
            "title": "2I - Psycology",
            "imageAlt": "Step illustration",
            "description": "📍10 VOLUMES\n\n•A Diary of the Change in the State of the Mind-Reading Girl\n•A Psychologist's Definition of \"Happiness\": The Cutting Edge of Happiness Research\n•Effort Builds Confidence, and Confidence Leads to Action\n•Introduction to Psychological Principles and Analysis\n•Mind Reading: Detecting Lies Through Facial Expressions and Gestures\n•Psychology: Mentality That the Weak Bark the Most\n•The Correlation of Magic and Emotion\n•The Psychology: Powerlessness and Responsibility Shifting\n•The Psychology of Backseat Gaming\n•The Psychology of Using Strong Language from a Safe Zone\n•The Psychology of Prioritizing Gaming Over Tidying Your Room\n•Ultimate Choise: Curry Flavoured Poop, or Poop Flavoured Curry?"
          },
          {
            "id": "step-1788896099772",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/622d5900-3b51-4453-9da7-3d1707639d9c-2nd-J.png",
            "title": "2J - Philosophy",
            "imageAlt": "Step illustration",
            "description": "📍10 VOLUMES\n\n•Ethics of Magic: Responsibility and Restrain\n•Fantasy or Reality? The Ontological Problem of World\n•Foundations of Metaphysics\n•I Think, Therefore I am\n•Introduction to Magical Determinisms: Spell-Causality and the Philosophy\n•Philosophy of Science: Methodology and Truth\n•Philosophy of Self and Other\n•Philosophy of Mana and Willpower\n•Philosophy: Power and Ethics\n•Philosophical Studies in Magic\n•Soul, Mind, and Body: Are They Truly Distinct\n•Teaching of the Great Philosophers of Magic"
          },
          {
            "id": "step-1788896361495",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/f31b18cf-d039-455b-943b-a6800018b700-2nd-K.png",
            "title": "2K - Jurisprudence",
            "imageAlt": "Step illustration",
            "description": "📍10 VOLUMES\n\n•Chronicles of the Magical Court\n•Codex of Truth Verification\n•Grand Compendium of Magic Jurisprudence\n•Law: Foundations of Contemporary Magical Jurisprudence\n•The Constitution of the Kingdom\n•The System and Precedent of the Arcane Court\n\n📍3 VOLUMES\n\n•Civil Liability Within Adventuring Parties\n•Comparative Study of National Magic Laws\n•Compendium of Magical Civil Law: Definition of Personhood, Rights, and Succession\n•Contract Law: How to Write Adventurer Contracts\n•Guild Charter: Guild Discipline and Expulsion Systems\n•Legal System for Magical Accidents and Accountability\n•Lagal Treatment of Forbidden Magic\n•Legality and Regulation of Magic Use\n•Magical Detective Law: Punishment Act for the Use of Unapproved and Unregistered Spell\n•Monster Hunting Law: List of Prohibited Species and Regulation of Attack Methods\n•The Idea of Equality Under the Law is Laughable\n•The Legalities of Party Disbandment: Property Distribution and Liability"
          },
          {
            "id": "step-1788896861863",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/6639ee01-2f16-4374-a82f-a7ed6ee1dcce-2nd-L.png",
            "title": "2L - Romance Novel",
            "imageAlt": "Step illustration",
            "description": "📍10 VOLUMES\n\n•A Kiss Wrought in Spells\n•A Midsummer Night's Sweet Dream\n•Romance Novel: A Pact Beneath the Stars\n•Romance Novel: Senior and the Beast\n•Romance Novel: The Fire King and The Ice Queen\n•Romance Novel: Whispers of the Moon\n\n📍3 VOLUMES\n\n•30 Year Old Wizard's First\n•Cursed to Love You\n•Fill the Solitude of My Millenium with Your Ninety Years\n•True Love Between a 20-Year-Old Lady and an 80-Year-Old Tycoon\n•The Strongest Archmage is Obsessed with Me, The Girl with Zero Magic!\n•The Witch and the Accidental Love Potion\n•Romance Novel: Lies More Beautiful Than Truth\n•Romance Novel: My Massive Golden Balls\n•Romance Novel: The Chicken and The Cat\n•Romance Novel: The Red Lady and the Bamboozled Men\n•Romance Novel: The Thorn Prince\n•Roses are Red, Violets are Blue"
          },
          {
            "id": "step-1788938236440",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/64139363-8435-456c-ad31-957c6edb7398-2nd-M.png",
            "title": "2M - Mystery Novels",
            "imageAlt": "Step illustration",
            "description": "📍10 VOLUMES\n\n•Detective the Reaper\n•Mystery Fiction: The Bloodstained Astrologer\n•Mystery Fiction: The Prospero Code\n•The Arcane Detective Files\n\n📍5 VOLUMES\n\n•Mystery Fiction: Judgment of the Spectral Tribunal\n•Mystery Fiction: Magical Theorist Maris\n•Mystery Fiction: One Who Looks Into the Abyss\n•Mystery Fiction: The Pirate Captain Who Stepped Down from His Ship"
          },
          {
            "id": "step-1788938852786",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/d9dacf89-b565-4567-9324-fbc45184c7e2-2nd-N.png",
            "title": "2N - History",
            "imageAlt": "Step illustration",
            "description": "📍10 VOLUMES\n\n•Origins of Magic: Awakening of the First Spells and Magic Power\n•Studies in the History of Magical Civilizations\n•The Genesis of Magic and the Evolution of Civilization\n•The Transition and Evolutionary History of Magic\n\n📍5 VOLUMES\n\n•Ancient Manuscript Studies on Mage Birth\n•History and Tactics of Magical Warfare\n•Record of the Demon King's Subjugation: The Archmage's Conquest\n•The History of World Exploration and the Discovery of Lost Continents"
          },
          {
            "id": "step-1788939339984",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/e3b3ada2-9081-4737-8888-214fe382f194-2nd-O.png",
            "title": "2O - The Travels of Otherworld",
            "imageAlt": "Step illustration",
            "description": "📍10 VOLUMES\n\n•A People Enchanted by Glowing Slabs\n•The Curious Daily Life in a World Without Magic\n•The Cursed Workplaces of a Magicless World\n•They Call Their Mana Dark Energy\n\n📍5 VOLUMES\n\n•A World Without A Demon Lord, Yet Full of Corporate Slaves\n•In the Otherworld, Money is the Ultimate Magic\n•Otherworld Chronicles: A World Ruled by Data\n•Strange Technology From Another World! The Ultimate Language: c++\n•The Internet: The All-Knowing Grimoire\n•The Otherworld: Demanding Fresh Graduates with 10 Years of Experience\n•The Ultimate Guide to Otherworldly Swear Words\n•They Worship an Invisible Entity Known as Wi-Fi"
          },
          {
            "id": "step-1788939887382",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/9bc6fce7-bfaa-44d7-9740-d20430575f7a-2nd-P.png",
            "title": "2P - Dungeons",
            "imageAlt": "Step illustration",
            "description": "📍10 VOLUMES\n\n•Bestiary Components: Dungeon Creatures\n•Compendium of Dungeon Resources\n•Dungeon of the Abyss\n•Fundamentals of Dungeon Architecture\n\n📍5 VOLUMES\n\n•Gourmet Expeditions in the Dungeon\n•Optimization Theory of Dungeon Routes\n•Practical Dungeon Tactics\n•The Daily Dungeon Notes of the Party Chronicle"
          },
          {
            "id": "step-1788940333245",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/58b2523c-8cc5-4dcc-b47c-af7082cd0daa-2nd-Q.png",
            "title": "2Q - Language",
            "imageAlt": "Step illustration",
            "description": "📍10 VOLUMES\n\n•Everyone's Demonic: Words of Covenant and Power\n•Everyone's Dwarvish: The Craftsman's Language\n•Everyone's Elvish: The Graceful Speech of the Forest\n•Everyone's Fairy Tongue: Tiny and Lovely Words\n\n 📍5 VOLUMES\n\n•How Did the First Language Emerge? The Origins of Language Evolution\n•Inter-Species Communication\n•The Birth of Magical Languages: Secrets of Spells and Ancient Speech\n•The Language of Draconic: Roars of Ancient Wisdom and Primal Power"
          }
        ],
        "title": "Master List By Shelf (Second Floor)"
      },
      {
        "id": "section-1788940741421",
        "steps": [
          {
            "id": "step-1788940960225",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/afeceaa1-73ab-4df4-a481-31c8132ec60b-1st-floor-map.png",
            "title": "🗺️ First Floor — Room Index",
            "imageAlt": "Step illustration",
            "description": "💡 Tip: Use this index to quickly find which shelves each book belongs to! \n\n•IA — Monsterology\n•IB — Astrology and Divination\n•IC — Curses and Dispels\n•ID — Bard and Music\n•IE — Necromancy\n•IF — Transfiguration\n•IG — Magical Artifacts and Enchanting\n•IH — Stealth\n•II — Illusion Magic\n•IJ — Summoning Magic\n•IK — Healer and Healing Magic\n•IL — Holy Magic\n•IM — Destruction Magic\n•IN — Alchemy and Potion-Making"
          },
          {
            "id": "step-1788941564611",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/536def8f-4923-4826-b176-3cbddaf43d9c-2nd-floor-map.png",
            "title": "🗺️ Second Floor — Room Index",
            "imageAlt": "Step illustration",
            "description": "•2A — Warrior\n•2B — Archery\n•2C — Daily Magic\n•2D — Mathematics\n•2E — Art\n•2F — Management\n•2G — Economics\n•2H — Sociology\n•2I — Psychology\n•2J — Philosophy\n•2K — Jurisprudence\n•2L — Romance Novels\n•2M — Mystery Novels\n•2N — History\n•2O — The Travels of Otherworld\n•2P — Dungeons\n•2Q — Language"
          }
        ],
        "title": "Library Map Guide"
      },
      {
        "id": "section-1788943446324",
        "steps": [
          {
            "id": "step-1788943488845",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/1a03ac6e-99ab-4987-a5b1-c0c7e82af4e5-ending.png",
            "title": "The Library Restored",
            "imageAlt": "Step illustration",
            "description": "Every book found its proper place. Every shelf stands orderly once more. Where there was only chaos and scattered pages, there now stands perfect peace. Row upon row, color upon color — the Arcane Library has been restored to its former glory.\n\nFrom the first book picked up to the very last one placed, every shelf, every room, every corner has been put back in order. The grand hall stands proud, the doors stand open, and the magic of the library shines bright once again."
          }
        ],
        "title": "✨ Library Fully Restored — Task Complete! ✅"
      },
      {
        "id": "section-1788943604147",
        "steps": [
          {
            "id": "step-1788943630535",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/4488fcc0-fbec-450e-913d-e8d4f82829ba-special.png",
            "title": "🌟 Special Stage — Books Fly Home!",
            "imageAlt": "Step illustration",
            "description": "When you reach the special stage, something truly wonderful happens. All the remaining books lift off the floor and — guided by streams of glowing light — fly magically through the air to their proper places on the shelves! 📚✨\n\nIt’s a breathtaking sight to watch: hundreds of books soaring across the grand hall, finding their own homes, and filling the shelves perfectly all on their own. Where there was once a sea of scattered volumes, the library restores itself in a dazzling, magical display."
          }
        ],
        "title": "The Magic of the Final Stage"
      }
    ]
  },
  {
    "id": "game-1788965775636",
    "title": "Sort Them Ducks",
    "category": "Organization",
    "coverAlt": "Placeholder cover",
    "gameLink": "https://store.steampowered.com/app/4992070/Sort_Them_Ducks/",
    "developer": "Mr.Duck",
    "coverImage": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/d8373019-b5ed-4f1d-842e-eadcc0f429b4-taytoll.jpeg",
    "editorNote": "Sorting these ducks has been such a joyful, peaceful experience. What began as a colorful pile of mixed-up ducks slowly transformed into something beautifully organized — one little duck at a time. There’s something wonderfully calming about spotting their unique features, matching them to their groups, and watching every dock fill up neatly.\n\nThis game isn’t just about sorting ducks. It’s about the simple joy of seeing things fit together perfectly, the quiet satisfaction of a job well done, and that wonderful feeling when every last duck finds its friends.\n\nFrom the first duck picked up to the very last one placed, it was pure delight. And seeing them all lined up happily? I highly recommend this game to anyone. If you love cozy, cheerful sorting games that leave you smiling and feeling perfectly peaceful, this one is absolutely worth playing. ✨🦆\n\n💬Curious to hear what you think! If you’ve played it yourself or have anything you’d like to share, feel free to drop a comment down below — I’d love to hear your experience.",
    "accentColor": "#f4bc00",
    "description": "Sort Them Ducks is a cozy organizing simulator where you sort over 4,000 unique rubber ducks onto the correct shelves. Enjoy the satisfying process of turning a messy duck store into a perfectly organized collection at your own pace.",
    "walkthrough": [
      {
        "id": "section-1788966105939",
        "steps": [
          {
            "id": "step-1788966172392",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/62da67ff-93a2-41a3-ad46-afd37bf8a8e4-chaos.png",
            "title": "How It Works",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "🔍 Pick up a duck — look at its theme, costume, and design to identify its category\n🦆 Read the name — the duck's name tells you exactly which shelf it belongs to!\n📦 Place it on the correct shelf — Pirates with Pirates, Wizards with Wizards, and so on\n💰 Earn money for every correctly placed duck → use it to unlock helpful upgrades\n⭐ Unlock abilities — carry more ducks, move faster, see hints, and more\n💡 No rush! No timers, no penalties — sort at your own peaceful pace",
            "spoilerText": ""
          }
        ],
        "title": "Getting Started & Mechanics"
      },
      {
        "id": "section-1788966241759",
        "steps": [
          {
            "id": "step-1788966286259",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/7919547d-fcbb-44e0-bc1b-fb7e9ad60aec-animals.png",
            "title": "ANIMALS",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "•Bear\n•Bunny\n•Fox\n•Frog\n•Giraffe\n•Lion\n•Monkey\n•Panda\n•Shark\n•Wolf",
            "spoilerText": ""
          },
          {
            "id": "step-1788966702897",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/3a97e6aa-85e6-4355-b3ca-bd8e0085ad5d-beach.png",
            "title": "BEACH",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "•Bikini\n•Diver\n•Glasses\n•Hat & Glasses\n•Hoody\n•Lifeguard\n•Sailor\n•Sand Castle\n•Surfer A\n•Surfer B",
            "spoilerText": ""
          },
          {
            "id": "step-1788966807344",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/dd26217d-e494-495c-bb68-78a9186e53be-circus.png",
            "title": "CIRCUS",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "•Animal Trainer\n•Canon Ball\n•Dancer\n•Jester\n•Knife Master\n•Magician\n•Mime\n•Seer\n•Show Master\n•Snake Master",
            "spoilerText": ""
          },
          {
            "id": "step-1788966912288",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/cb998ae0-211f-44dc-8f3e-e30c340ffa73-countries.png",
            "title": "COUNTRIES",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "•America\n•Brazil\n•Britain \n•China\n•France\n•Italy\n•Japan\n•Mexico\n•Spain\n•Turkiye",
            "spoilerText": ""
          },
          {
            "id": "step-1788967021512",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/eb2d4b0d-f635-4ade-8db1-555dbeb8e393-cowboy.png",
            "title": "COWBOY",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "•Chief Feather\n•Cowboy Bill\n•Lady Quackington\n•Little Eagle\n•Lord Quackington\n•Masked Marshal\n•Outlaw Drake\n•Professor Puddle\n•Sheriff Quack\n•Undertaker",
            "spoilerText": ""
          },
          {
            "id": "step-1788967245795",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/aacfb14e-2834-4f27-b40b-097eb83d56ae-food.png",
            "title": "FOOD",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "•Burger\n•Cookie\n•Donut\n•Ice Cream\n•Ketchup\n•Milkshake\n•Mustard\n•Nugget\n•Pizza\n•Sushi",
            "spoilerText": ""
          },
          {
            "id": "step-1788967385244",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/2cbabf02-ba05-4f3d-b003-44c147e775ad-fruits.png",
            "title": "FRUITS",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "•Apple\n•Avocado\n•Banana\n•Berry\n•Dragon Fruit\n•Grape\n•Pineapple\n•Pomegranate\n•Strawberry\n•Watermelon",
            "spoilerText": ""
          },
          {
            "id": "step-1788967606509",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/10d79baf-175a-438e-8310-7ab17f4e65ff-garden.png",
            "title": "GARDEN",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "•Bee\n•Blue Gnome\n•Butterfly\n•Egg\n•Farmer Boy\n•Farmer Girl\n•Lady Bug\n•Mushroom A\n•Mushroom B\n•Red Gnome",
            "spoilerText": ""
          },
          {
            "id": "step-1788967718181",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/321b0824-241e-4bda-9f28-71d77271f666-haloween.png",
            "title": "HALLOWEEN",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "•Black Cat\n•Death\n•Devil\n•Dracula\n•Frankenstein\n•Ghost\n•Mummy\n•Werewolf\n•Witch\n•Zombie",
            "spoilerText": ""
          },
          {
            "id": "step-1788967825672",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/8af11bf6-ccf4-446c-b6a2-f98dd3a23fa9-jobs.png",
            "title": "JOBS",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "•Artist\n•Businessman\n•Chef\n•Doctor\n•Fire Fighter\n•Photographer\n•Pilot\n•Police\n•Scientist\n•Worker",
            "spoilerText": ""
          },
          {
            "id": "step-1788967942375",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/c4b6d8f4-1203-44e9-9518-76d55f67b0bd-mafia.png",
            "title": "MAFIA",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "•AI Capon\n•AI Capon's Wife\n•Bar Singer\n•Bartender\n•Detective A\n•Detective B\n•Goon A \n•Goon B\n•Mafia Accountant\n•Mafia Driver",
            "spoilerText": ""
          },
          {
            "id": "step-1788968069521",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/80486bd9-7b18-4772-b489-ce81b3262e51-music.png",
            "title": "MUSIC",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "•Accordion\n•Bagpipe\n•Banjo\n•Cello\n•DJ\n•Keytar\n•Rapper\n•Rockstar\n•Saxophone\n•Violin",
            "spoilerText": ""
          },
          {
            "id": "step-1788968275309",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/d7af76ef-abc5-4ae3-b558-4df4640b3535-ninja.png",
            "title": "NINJA",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "•Archer Ninja\n•Black Ninja\n•Brown Ninja\n•Cat Ninja\n•Green Ninja\n•Purple Ninja\n•Red Ninja\n•Sniper Ninja\n•Training Ninja\n•Violet Ninja",
            "spoilerText": ""
          },
          {
            "id": "step-1788968400864",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/6c32f0d8-cdd9-4bda-a7a2-d6ad0f8ab93a-pirates.png",
            "title": "PIRATES",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "•Barbossa\n•Cannon Pirate\n•Chef Pirate\n•Mermaid\n•Navigator\n•Pirate Goon\n•Pirate Janitor\n•Pirate Princess\n•Ship Pirate\n•Ship Soldier",
            "spoilerText": ""
          },
          {
            "id": "step-1788968521992",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/6d4d9a35-a19d-469c-807e-d5a5d106b4a9-space.png",
            "title": "SPACE",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "•Blue Astronaut\n•Earth\n•Green Alien\n•Jupiter\n•Moon\n•Orange Spaceman\n•Purple Alien\n•Space Pirate\n•Sun\n•White Astronaut",
            "spoilerText": ""
          },
          {
            "id": "step-1788968645628",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/b22e57b2-30ba-4bc6-b527-c7db29382ac9-sport.png",
            "title": "SPORT",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "•Baseball\n•Basketball\n•Boxer\n•Football\n•Golf\n•Hockey\n•Karate\n•Rider\n•Skater\n•Swimmer",
            "spoilerText": ""
          },
          {
            "id": "step-1788968737032",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/bc5da2f9-cc69-47f0-9461-a0b086c82254-superheroes.png",
            "title": "SUPERHEROES",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "•Batduck\n•Captain Duck\n•Fast Duck\n•Green Duck\n•Iron Duck\n•Lantern Duck\n•Spider Duck\n•Super Duck\n•Wonder Duck\n•XDuck",
            "spoilerText": ""
          },
          {
            "id": "step-1788968871337",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/a7bdaec6-2c34-4e13-9c4c-035a03bb0e5a-warriors.png",
            "title": "WARRIORS",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "•African Warrior\n•Centurion\n•Knight\n•Mongolian Warrior\n•Musketeer\n•Native Warrior\n•Samurai Warrior\n•Scottish Warrior\n•Stone Age Warrior\n•Viking",
            "spoilerText": ""
          },
          {
            "id": "step-1788968997146",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/4ad1a72c-1665-4069-9128-302a5e055327-weather.png",
            "title": "WEATHER",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "•Blizzard\n•Cloudy\n•Lightning\n•Rainbow\n•Rainy\n•Sand Storm\n•Sunny\n•Tornado\n•Tsunami\n•Windy",
            "spoilerText": ""
          },
          {
            "id": "step-1788969145737",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/d04b35d7-0d06-4493-abe1-3b6d9e41db96-tower.png",
            "title": "TOWER",
            "imageAlt": "Step illustration",
            "hasSpoiler": true,
            "description": "•Red Tower\n•Orange Tower\n•Yellow Tower\n•Green Tower\n•Light Blue Tower\n•Dark Blue Tower\n•Purple Tower",
            "spoilerText": "Spoiler warning: Click to reveal solution"
          },
          {
            "id": "step-1788969708953",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/1969ca33-4608-4e08-9c97-162807e12743-bonus-2.png",
            "title": "🥚 Hidden Eggs & Special Ducks — Secret Objective",
            "imageAlt": "Step illustration",
            "hasSpoiler": true,
            "description": "⚠️ Spoiler — Hidden Objective\nBeyond sorting the regular ducks, there are two special collections you’ll need to find to fully complete the game:\n🥚 1. Collect All 10 Hidden Eggs\nScattered throughout the duck store are 10 hidden egg pieces tucked away in the most chaotic corners and hard-to-spot places. You must find and collect all 10 pieces. Once every piece is gathered, the Great Egg will be revealed — and placing it is what officially completes the entire game!\n⭐ 2. Find the 5 Special Ducks\nKeep an eye out for 5 unique, special ducks that do not go on regular shelves. These distinguished ducks are displayed on the \"Quack of Fame\" wall — each one is rare and must be found separately from the rest. Look carefully; they are not sorted like ordinary ducks!\n💡 Note: You won't see these counted in your main totals until you find them. Explore every corner thoroughly — completion means finding everything: all ducks, all 10 eggs, and all 5 special ones!",
            "spoilerText": "Spoiler warning: Click to reveal solution"
          }
        ],
        "title": "Groups & Categories Guide"
      },
      {
        "id": "section-1788970201429",
        "steps": [
          {
            "id": "step-1788970327604",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/a7035f04-fe10-4b44-96d5-b9f1da079e99-after-chaos.png",
            "title": "✨ Every Duck In Its Place",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "Every duck is grouped with its friends. Every shelf is neat. Every dock is full. Where there was a waddling, quacking mess, there now stands perfect order — row upon row of happy ducks, all exactly where they belong.\n\"That moment when chaos turns into quack-perfection.\" ✨🦆",
            "spoilerText": ""
          }
        ],
        "title": "Ending & Final Thoughts"
      }
    ]
  },
  {
    "id": "game-1788944743653",
    "title": "Cellar Keeper",
    "category": "Cozy Games",
    "coverAlt": "Placeholder cover",
    "gameLink": "https://store.steampowered.com/app/4935510/Cellar_Keeper/",
    "developer": " EgoTrampoline",
    "coverImage": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/a650805c-d04d-4ee7-9f65-055d249e9182-taytol.jpeg",
    "editorNote": "Honestly, this game surprised me in the best way. When I first stepped in and saw thousands of bottles scattered everywhere, it felt overwhelming — but as I started sorting, I realized something clever about how it works. The name printed right on each bottle is actually the name of the shelf it belongs on. That’s your biggest clue!\n\nBut here’s the thing: the bottles themselves look nearly identical across shelves. It feels like the same sets have been shuffled around and given different names, rather than being truly unique collections. So you’ll find yourself recognizing the same shapes and designs over and over — just with different labels attached. That’s why memorizing lists doesn’t help much, and why the symbols on the map become so important. They’re the one thing that never changes, even when the names feel like they’ve been mixed up.\n\nOnce I stopped overthinking it and trusted what the names and symbols were telling me, everything fell into a wonderfully peaceful rhythm. Pick up a bottle → read its name → match its symbol → place it where it belongs. Simple, satisfying, and incredibly calming.\n\nAnd then that special moment near the end… watching the remaining bottles lift up and glide beautifully into their proper places? Absolutely magical. All that patience paying off, turning a sea of chaos into perfectly ordered rows.\n\nFrom the first bottle I picked up to the very last one placed on the shelf, it was such a relaxing, rewarding journey. Seeing the cellar transform from mess to perfection gives you this wonderful feeling of accomplishment. I recommend this game to anyone. If you love cozy sorting games that let you take your time and find your own rhythm, this one is absolutely worth playing.\n\n💬 Curious to hear what you think of it too! If you’ve played it yourself or have anything you’d like to share, feel free to drop a comment down below — I’d love to hear your experience.",
    "accentColor": "#dd4f36",
    "description": "Cellar Keeper is a cozy single-player organizing simulator where you sort 2,448 scattered bottles throughout a forgotten cellar. Return every bottle to its proper shelf, organize collections by type, unlock helpful abilities, and restore perfect order as efficiently as possible.",
    "walkthrough": [
      {
        "id": "section-1788953768002",
        "steps": [
          {
            "id": "step-1788953801574",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/b2edf9f6-6e4c-4ab8-b094-0c7956d25b67-chaos-1.png",
            "title": "How It Works",
            "imageAlt": "Step illustration",
            "description": "🔍 Pick up a bottle — check the label, shape, color, markings, and type\n🏷️ Read the clues — wine type, origin, vintage, and symbols show exactly where it belongs\n📦 Place it on the correct shelf — bottles are organized by Type, Region, and Vintage\n✅ It fits when it’s right! Wrong bottles won’t stay in place\n✨ Unlock helpful abilities as you sort more bottles — make your work easier and faster\n💡 Play at your own pace! No rush, no timers — enjoy sorting all 2,448 bottles peacefully"
          }
        ],
        "title": "Getting Started & Mechanics"
      },
      {
        "id": "section-1788953971059",
        "steps": [
          {
            "id": "step-1788953985310",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/e390b46e-2269-4e63-bd2e-65b56c1e94e4-1f-malbec.png",
            "title": "MALBEC (Tree/Wheat Sigil)",
            "imageAlt": "Step illustration",
            "description": "All bottles here feature dark blue labels with gold/white lettering.\nDivided into 4 shelves: Left shelves (5 series), Mid-Left shelves (3 series), Center shelves (9 series), and Right shelves (3 series).\n\n📍9 SERIES\nBramblewood\nOrchad Dew\nVanguard Crest\nVerdant Drop\nWilderberry\n\n📍5 SERIES\n•Aethelgard\n•Kestrel Ridge\n•Luminore\n•Rust&oak\n•Thornback\n\n📍3 SERIES\n•Bellacord\n•Deeproot\n•Gilded Petal\n•Meridian Sun\n•Novafizz\n•Saturday\n•Sirens Call\n•Solaria\n•Timberloft\n•Zephyrhill"
          },
          {
            "id": "step-1788954188299",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/86a55f1b-2ebd-4ebc-a322-1045baee7d27-1f-pinotage.png",
            "title": "PINOTAGE (Trident/Candelabra Sigil)",
            "imageAlt": "Step illustration",
            "description": "All bottles here feature bright white/cream labels with black lettering and numbered vintages (1–5 or 1–9).\n5 shelves holding 9 series (front) and 10 shelves holding 5 series (sides).\n\n📍9 SERIES\n•Clockwork Cellars\n•Gilded Petal\n•Luminore\n•Mythos\n•Zephythill\n\n📍5 SERIES\n•Aethelgard\n•Aventine\n•Bancroft\n•Hearthside\n•Kestrel Ridge\n•Mediterranean Pearl\n•Oakhaven\n•Rust&Oak\n•Sirens Call\n•Sunbliss"
          },
          {
            "id": "step-1788954335204",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/0229c4e7-184b-470f-92af-f7cbac4507ec-1f-carmenere.png",
            "title": "CARMENERE (Sprout/Diamond Crest Sigil)",
            "imageAlt": "Step illustration",
            "description": "All bottles here feature white/cream labels with distinct colored brand accents (pinks, reds, and golds).\nDivided into: Center Shelves (9 series each), Left Shelves (3 series each), and Right Shelves (3 series each).\n\n📍9 SERIES\n•Bancroft\n•Gilded Petal\n•Luminore\n•Mythos\n•Wintervale\n\n📍3 SERIES\n•Aethelgard\n•Bellacord\n•Frostbite\n•Meridian Sun\n•Orchad Dew\n•Rust&Oak\n•Sovereign Vine\n•Timberloft\n•Valerius\n•Volante"
          },
          {
            "id": "step-1788954531055",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/ff90fd86-85ac-4528-a047-d5145efeb9e4-1f-chardonnay.png",
            "title": "CHARDONNAY (Triple Berry/Sprout Sigil)",
            "imageAlt": "Step illustration",
            "description": "All bottles here feature cream/light-yellow labels with gold circular crest emblems.\n5 shelves containing 5 series (front) and 10 shelves containing 3 series (sides).\n\n📍5 SERIES\n•Astraea\n•Bellacord\n•Lunis\n•Mediterranean Pearl\n•Orchad Dew\n\n📍3 SERIES\n•Bancroft\n•Celestia\n•Deeproot\n•Novafizz\n•Sirens Call\n•Sovereign Vine\n•Thornback\n•Volante\n•Wilderberry\n•Zephyrhill"
          },
          {
            "id": "step-1788954773941",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/be0d9e3c-f92f-46ba-bbaa-7c8999ba259e-1f-cabernet-savignon.png",
            "title": "CABERNET SAUVIGNON (Square Cup/Anchor Sigil)",
            "imageAlt": "Step illustration",
            "description": "All bottles here feature bold yellow/gold labels with dark lettering.\nDivided into: Center Shelves (9 series each), Left Shelves (3 series each), and Right Shelves (3 series each).\n\n📍5 SERIES\n•Amberglow\n•Aventine\n•Orchad Dew\n•Tiberloft\n•Whisperwood\n\n📍3 SERIES\n•Bellacord\n•Celestia\n•Clockwork Cellars\n•Lunis\n•Mediterranean Pearl\n•Solaria\n•Sovereign Vine\n•Sunbliss\n•Volante\n•Wintervale"
          },
          {
            "id": "step-1788954938135",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/7d41850e-f867-4c67-bbd6-916bc25e8cce-1f-pinot-meunier.png",
            "title": "PINOT MEUNIER (Double Square Sigil)",
            "imageAlt": "Step illustration",
            "description": "All bottles here feature white/cream labels with black lettering.\nDivided into: Center Shelves (9 series each), Left and Right Shelves (3 series each).\n\n📍9 SERIES\n•Celestial\n•Gilded Petal\n•Lunis\n•Mythos\n\n📍3 SERIES\n•Arthelgard\n•Bellacord\n•Clockwork Cellars\n•Ironbound\n•Luminore\n•Saturday\n•Sirens Call\n•Solaria"
          },
          {
            "id": "step-1788955472364",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/3a163c87-05ee-4d35-b335-4b8da7931615-1f-touriga-nacional.png",
            "title": "TOURIGA NACIONAL (Single Tree/Wheat Sigil)",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "All bottles here feature cream/white labels and belong to the pillar rack section.\nDivided into: Front Shelves (4 shelves holding 5 series each) and Side Shelves (4 shelves holding 3 series each).\n\n📍5 SERIES\n•Aethelgard\n•Bancroft\n•Clockwork Cellars\n•Crimson Vine\n•Lunis\n•Oakhaven\n•Vanguard\n\n📍3 SERIES\n•Aventine\n•Bellacord\n•Deeproot\n•Ironbound\n•Mythos\n•Rust&Oak\n•Valerius\n•Whisperwood",
            "spoilerText": ""
          },
          {
            "id": "step-1788955656389",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/3104f0cf-02ad-4563-88ee-7bb8315154e5-1F-okuzgozu.png",
            "title": "OKUZGOZU (Sprout Leaf Sigil)",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "All bottles here feature white/cream labels with black/gold text and belong to the Merlot series.\nDivided into 5 bay sections across the corner wall: Left Bay (5 series), Mid-Left Bay (9 series), Mid-Right Bay (5 series), and Right Bay (9 series), plus an angled far-right rack (3 series).\n\n📍9 SERIES\n•Aventine\n•Bellacord\n•Kestrel Ridge\n•Rust&Oak\n•Solaria\n•Thornback\n•Volante\n•Whisperwood\n\n📍5 SERIES\n•Deeproot\n•Ironbound\n•Lunis\n•Mediterranean Pearl\n•Meridian Sun\n•Mythos\n•Vanguard Crest\n•Wilderberry\n\n📍3 SERIES\n•Amberglow\n•Bramblewood\n•Celestia\n•Frostbite",
            "spoilerText": ""
          },
          {
            "id": "step-1788955878342",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/b15b0740-f245-46f9-8ebd-6084b635fbb6-1f-palomino.png",
            "title": "PALOMINO (Palm/Tree Crown Sigil)",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "All bottles here feature dark/black labels with gold or light-colored vintage emblems.\nDivided into 4 bay sections: Left Shelves (9 series each), Mid-Left Shelves (5 series each), Mid-Right Shelves (5 series each), and Right Shelves (5 series each).\n\n📍9 SERIES\n•Kestrel Ridge\n•Mediterranean Pearl\n•Meridian Sun\n•Saturday\n\n📍5 SERIES\n•Astraea\n•Celestia\n•Elysian\n•Luminore\n•Novafizz\n•Solaria\n•Thornback\n•Valerius\n•Verdant Drop\n•Wilderberry\n•Wintervale\n•Zephirhill",
            "spoilerText": ""
          },
          {
            "id": "step-1788956047940",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/06daf5de-092b-4ff9-b12f-9f75ea7077f3-1f-tempranillo.png",
            "title": "TEMPRANILLO (Leaf/Sprout Cross Sigil)",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "All bottles here feature rich red/maroon labels with gold and white accents.\nDivided into 4 bay sections: Left Shelves (5 series each), Mid-Left Shelves (5 series each), Mid-Right Shelves (5 series each), and Right Shelves (9 series each).\n\n📍9 SERIES\n•Clockwork Cellars\n•Deeproot\n•Kestrel Ridge\n•Timberloft\n\n📍5 SERIES\n•Astraea\n•Bellacord\n•Crimson Vine\n•Frostbite\n•Gided Petal\n•Hearthside\n•Ironbound\n•Mediterranean Pearl\n•Mythos\n•Solaria\n•Volante\n•Wilderberry",
            "spoilerText": ""
          },
          {
            "id": "step-1788956222037",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/017355a5-9418-4d73-8cb8-29b515941a8a-1F-pinot-grigio.png",
            "title": "PINOT GRIGIO (Triquetra/3-Leaf Sigil)",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "All bottles here feature dark navy/black labels with gold crests and lettering.\nDivided into 5 sections across the corner wall: Left Angled Shelves (3 series each), Left Wall Shelves (9 series each), Mid-Left Shelves (5 series each), Center Shelves (9 series each), and Right Shelves (5 series each).\n\n📍9 SERIES\n•Bellacord\n•Elysian\n•Kestrel Ridge\n•Mediterranean Pearl\n•Orchad Dew\n•Sovereign Vine\n•Thornback\n•Wintervale\n\n📍5 SERIES\n•Astraea\n•Bramblewood\n•Crimson Vine\n•Ironbound\n•Rust&Oak\n•Saturday\n•Valerius\n•Volante\n\n📍3 SERIES\n•Celestia\n•Hearthside\n•Luminore\n•Mythos",
            "spoilerText": ""
          },
          {
            "id": "step-1788956496112",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/9a0ed98c-ec6a-468f-b3e8-f5781fb89e42-1f-primitivo.png",
            "title": "PRIMITIVO (Single Tree/Wheat Sigil)",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "All bottles here feature bold red/crimson labels with gold lettering.\nDivided into: Center Pillar Shelves (4 shelves holding 5 series each) and Side/Wall Shelves (4 shelves holding 3 and 5 series each).\n\n📍5 SERIES\n•Aventine\n•Celestia\n•Meridian Sun\n•Orchad Dew\n•Sovereign Vine\n•Vanguard Crest\n•Wintervale\n•Whisperwood\n\n📍3 SERIES\n•Aethelgard\n•Bellacord\n•Lunis\n•Mythos\n•Rust&Oak\n•Thornback\n•Volante\n•Wilderberry",
            "spoilerText": ""
          },
          {
            "id": "step-1788956671762",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/c94db719-910a-41b8-b413-531319a6a7ad-1f-sangiovese.png",
            "title": "SANGIOVESE (Eye/Diamond Sigil)",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "All bottles here feature warm orange, amber, and terracotta labels with vintage crests.\nDivided into: Center Shelves (9 series each), Left Shelves (3 series each), and Right Shelves (3 series each).\n\n📍9 SERIES\n•Bramblewood\n•Kestrel Ridge\n•Oakhaven\n•Thornback\n\n📍3 SERIES\n•Crimson Vine\n•Frostbite\n•Mediterranean Pearl\n•Mythos\n•Sunbliss\n•Timberloft\n•Wilderberry\n•Zephyrhill",
            "spoilerText": ""
          },
          {
            "id": "step-1788956834961",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/8a4c921b-77e5-4efb-9abb-dad7aa01381b-1f-glera.png",
            "title": "GLERA (Hexagon Tree Sigil)",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "All bottles here feature cream/white labels with dark vintage lettering and numbering.\nDivided into: Center Shelves (9 series each), Left Shelves (3 series each), and Right Shelves (3 series each).\n\n📍9 SERIES\n•Gilded Petal\n•Meridian Sun\n•Orchad Dew\n•Sirens Call\n•Solaria\n\n📍3 SERIES\n•Amberglow\n•Astraea\n•Bellacord\n•Celestia\n•Glera\n•Luminore\n•Verdant Drop\n•Volante\n•Whisperwood\n•Zephyrhill",
            "spoilerText": ""
          },
          {
            "id": "step-1788957000837",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/2ef7a86b-7f5b-4d56-9c08-543ac03dab14-1f-shiraz.png",
            "title": "SHIRAZ (Double Leaf/Sprout Sigil)",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "All bottles here feature dark purple/black labels with gold vintage crests.\nDivided into: Front Shelves (5 shelves holding 5 series each) and Side Shelves (5 shelves holding 3 series each).\n\n📍5 SERIES\n•Clockwork Cellars\n•Ironbound\n•Rust&Oak\n•Sirens Call\n•Volante\n\n📍3 SERIES\n•Amberglow\n•Astraea\n•Aventine\n•Celestia\n•Gilded Petal\n•Hearthside\n•Mythos\n•Solaria\n•Wilderberry\n•Zephyrhill",
            "spoilerText": ""
          },
          {
            "id": "step-1788957177990",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/ddc51d51-d064-4f46-898a-72188395770e-1f-riesling.png",
            "title": "RIESLING (Intertwined Loop/Knot Sigil)",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "All bottles here feature dark bronze/brown labels with gold lettering and belong to the Riesling series.\nDivided into: Center Shelves (9 series each), Left Shelves (3 series each), and Right Shelves (3 series each).\n\n📍9 SERIES\n•Elysian\n•Oakhaven\n•Orchad Dew\n•Solaria\n•Zephyrhill\n\n📍3 SERIES\n•Amberglow\n•Celestia\n•Clockwork Cellars\n•Deeproot\n•Marrowstone\n•Mediterranean Pearl\n•Saturday\n•Verdant Drop\n•Whisperwood\n•Wilderberry",
            "spoilerText": ""
          },
          {
            "id": "step-1788957486265",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/257a01b5-62b7-4c94-ad3e-54cda4b08ea7-1F-merlot.png",
            "title": "MERLOT (Eye Sigil)",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "All bottles here belong to the Merlot series with varied label colorways across each shelf.\nDivided into: Front Shelves (5 shelves holding 9 series each) and Side Shelves (5 shelves holding 5 series each).\n\n📍9 SERIES\n•Deeproot\n•Ironbound\n•Lunis\n•Oakhaven\n•Volante\n\n📍5 SERIES\n•Amberglow\n•Astraea\n•Aventine\n•Bancroft\n•Celestia\n•Hearthside\n•Marrowstone\n•Mythos\n•Sunbliss\n•Wintervale",
            "spoilerText": ""
          },
          {
            "id": "step-1788957652989",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/ad81c04f-a86a-4fb9-af0a-270b24ed19a7-1f-semillon.png",
            "title": "SEMILLON (Trident Leaf/Bloom Sigil)",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "All bottles here feature diagonal banner-style labels in warm tones (peach, orange, and cream).\nDivided into: Center-Left Shelves (9 series each), Far-Right Shelves (5 series each), Left Shelves (3 series each), and Mid-Right Shelves (3 series each).\n\n📍9 SERIES\n•Amberglow\n•Bancroft\n•Gilded Petal\n•Marrowstone\n•Sovereign Vine\n\n📍5 SERIES\n•Aethelgard\n•Aventine\n•Frostbite\n•Ironbound\n•Sirens Call\n\n📍3 SERIES\n•Bellacord\n•Bramblewood\n•Hearthside\n•Oakhaven\n•Orchad Dew\n•Sunbliss\n•Timberloft\n•Vanguard Crest\n•Volante\n•Whisperwood",
            "spoilerText": ""
          }
        ],
        "title": "Cellar Map & Shelf Guide (First Floor)"
      },
      {
        "id": "section-1788957870481",
        "steps": [
          {
            "id": "step-1788957962181",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/53023bb7-8dbe-4059-9914-c92010a1ab67-2F-muscat.png",
            "title": "MUSCAT (Spire/Crosshair Sigil)",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "All bottles here feature dark green/gold labels with vintage lettering.\nDivided into: Center Shelves (9 series each), Left Shelves (3 series each), and Right Shelves (3 series each).\n\n📍9 SERIES\n•Meridian Sun\n•Sirens Call\n•Verdant Drop\n•Wilderberry\n•Zephyrhill\n\n📍3 SERIES\n•Aethelgard\n•Aventine\n•Bancroft \n•Bellacord\n•Gilded Petal\n•Marrowstone\n•Oakhaven\n•Solaria\n•Vanguard Crest\n•Volante",
            "spoilerText": ""
          },
          {
            "id": "step-1788958142322",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/4ebc3f8e-edc0-4059-8f65-6eacf60b7f7a-2f-sauvignon-blanc.png",
            "title": "SAUVIGNON BLANC (Curved Antenna/Trident Sigil)",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "All bottles here feature dark labels with light vintage lettering and emblems.\nDivided into: Front and Side Shelves (5 shelves holding 5 series each).\n\n📍5 SERIES\n•Bramblewood\n•Celestia\n•Crimson Vine\n•Gilded Petal\n•Ironbound\n•Marrowstone\n•Mediterranean Pearl\n•Oakhaven\n•Saturday\n•Solaria\n•Vanguard Crest\n•Verdant Drop\n•Volante\n•Whisperwood\n•Wilderberry",
            "spoilerText": ""
          },
          {
            "id": "step-1788958281065",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/8d45b9e8-0747-4f4a-950d-9b5046c7b3df-2F-chenin-blanc.png",
            "title": "CHENIN BLANC (Flask/Beaker Sigil)",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "All bottles here feature white/cream labels with dark lettering.\nDivided into: Front Shelves (5 shelves holding 5 series each) and Side Shelves (5 shelves holding 5 series each).\n\n📍5 SERIES\n•Amberglow\n•Bancroft\n•Celestia\n•Elysia\n•Frostbite\n•Hearthside\n•Kestrel Ridge\n•Novafizz\n•Orchad Dew\n•Sunbliss\n•Thornback\n•Timberloft\n•Valerius\n•Vanguard\n•Whisperwood",
            "spoilerText": ""
          },
          {
            "id": "step-1788958441198",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/375c48f8-8376-4549-a0db-fd41552d3438-2f-strawberry.png",
            "title": "STRAWBERRY (Crossed/Double Arrow Sigil)",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "All bottles here feature rich red/crimson labels with gold accents and vintage numbering.\nDivided into 3 angled bay sections: Left Shelves (5 series each), Center Shelves (5 series each), and Right Shelves (5 series each).\n\n📍5 SERIES\n•Astraea\n•Aventine\n•Bancroft\n•Bramblewood\n•Crimson Vine\n•Gilded Petal\n•Hearthside\n•Ironbound\n•Mediterranean Pearl\n•Mythos\n•Sovereign Vine\n•Valerius\n•Volante\n•Wintervale\n•Whisperwood",
            "spoilerText": ""
          },
          {
            "id": "step-1788958571041",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/597efde2-b9a6-474c-bfae-76e0c2c82ccf-2F-blackberry.png",
            "title": "BLACKBERRY (Bow/Harpoon Sigil)",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "All bottles here feature dark blue, green, and gold accent labels.\nDivided into: Center Shelves (9 series each), Left Shelves (3 series each), and Right Shelves (3 series each).\n\n📍9 SERIES\n•Amberglow\n•Celestia\n•Frostbite\n•Kestrel Ridge\n•Orchad Dew\n\n📍3 SERIES\n•Aethelgard\n•Astraea\n•Elysian\n•Meridian Sun \n•Novafizz\n•Sirens Call\n•Solaria\n•Sovereign Vine\n•Valerius\n•Verdant Drop",
            "spoilerText": ""
          },
          {
            "id": "step-1788958704993",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/ede40158-472c-4bd9-9fca-77af914233e7-2F-mead.png",
            "title": "MEAD (Branched Star/Asterisk Sigil)",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "All bottles here feature dark and cream labels with vintage crests across a wide curved display.\nDivided into 3 sections: Center Shelves (9 series each), Left and Right Shelves (6 series each).\n\n📍9 SERIES\n•Aethelgard\n•Bellacord\n•Elysian\n•Oakhaven\n•Sunbliss\n\n📍6 SERIES\n•Kestrel Ridge\n•Luminore\n•Marrowstone\n•Meridian Sun\n•Solaria\n•Thornback\n•Timberloft\n•Verdant Drop\n•Wilderberry\n•Zephyrhill",
            "spoilerText": ""
          },
          {
            "id": "step-1788958925587",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/c969d493-c980-414b-8df0-ce60b9dfd2b9-2F-pomegranate.png",
            "title": "POMEGRANATE (Hourglass Box Sigil)",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "All bottles here feature white/cream labels with dark/crimson accents.\nDivided into 3 curved sections: Center Shelves (9 series each), Left Shelves (6 series each), and Right Shelves (6 series each).\n\n📍9 SERIES\n•Astraea\n•Clockwork Cellars\n•Mythos\n•Verdant Drop\n•Zephyrhill\n\n📍6 SERIES\n•Crimson Vine\n•Deeproot\n•Kestrel Ridge\n•Luminore\n•Lunis\n•Meridian Sun\n•Novafizz\n•Solaria\n•Valerius\n•Whisperwood",
            "spoilerText": ""
          },
          {
            "id": "step-1788959064085",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/aba62fde-97ba-43bd-b3a5-f71d1677d6d2-2f-cherry.png",
            "title": "CHERRY (Geometric 2/Hourglass Sigil)",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "All bottles here feature bright pink and peach labels with dark accents.\nDivided into 3 curved sections: Center Shelves (9 series each), Left Shelves (3 series each), and Right Shelves (3 series each).\n\n📍9 SERIES\n•Celestia\n•Marrowstone\n•Oakhaven\n•Thornback\n•Wilderberry\n\n📍3 SERIES\n•Kestrel Ridge\n•Luminore\n•Meridian Sun\n•Novafizz\n•Solaria\n•Sunbliss\n•Timberloft\n•Vanguard Crest\n•Verdant Drop\n•Zephyrhill",
            "spoilerText": ""
          },
          {
            "id": "step-1788959384422",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/a90846a5-99ac-40e4-a37c-732c3a4e7245-2F-blueberry.png",
            "title": "BLUEBERRY (Pine Branch/Arrow Sigil)",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "All bottles here feature a mix of label designs (dark green, light cream, and diagonal banners).\nDivided into 3 angled bay sections: Left Shelves (5 series each), Center Shelves (5 series each), and Right Shelves (5 series each).\n\n📍5 SERIES\n•Aventine\n•Bancroft\n•Gilded Petal\n•Hearthside\n•Ironbound\n•Marrowstone\n•Mediterranean Pearl\n•Saturday\n•Sunbliss\n•Thornback\n•Timberloft\n•Vanguard Crest\n•Volante\n•Wilderberry\n•Wintervale",
            "spoilerText": ""
          },
          {
            "id": "step-1788959507577",
            "image": "",
            "title": "GRENACHE (Hourglass Sigil)",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "All bottles here feature light/cream labels with dark vintage lettering.\nDivided into: Front Shelves (5 shelves holding 5 series each) and Side Shelves.\n\n📍5 SERIES\n•Aethelgard\n•Astraea\n•Bramblewood\n•Clockwork Cellars\n•Crimson Vine\n•Deeproot\n•Ironbound\n•Luminore\n•Lunis\n•Marrowstone\n•Mythos\n•akhaven\nRust&Oak\nSirens Call\nSovereign Vine",
            "spoilerText": ""
          }
        ],
        "title": "Cellar Map & Shelf Guide (Second Floor)"
      },
      {
        "id": "section-1788960404391",
        "steps": [
          {
            "id": "step-1788961904247",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/efc7c9a2-a296-4688-a4e4-43e34bd4ffc9-plain-map.jpeg",
            "title": "In-Game Map & Reference",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "Two beautifully illustrated floor plans reveal the full layout of the cellar, clearly marking the complete arrangement of every wine variety throughout both levels. Each floor is divided neatly down the middle into two distinct sections, with every variety assigned its own unique symbol that appears consistently on the map and on the bottle labels themselves.\nYou have two easy ways to sort every bottle — simply refer to the in-game map whenever you need guidance, or use the organized list I’ve prepared right here for you. Whatever feels more convenient: glance at the map to see exactly where everything belongs, or check the list below to find the match you need. Either way works perfectly.\nEvery symbol matches perfectly — what you see marked on the map is exactly what appears printed on each bottle’s label. Simply match the symbol on the bottle to the same symbol shown on the chart, and you will know instantly which floor, which side, and which shelf that bottle belongs to. There is no guesswork and no need to memorize anything — just follow the symbols, or consult the list, and every bottle will guide itself home to its proper place. ✨\n\"Symbols are your map — match them, and you’ll never get lost.\"",
            "spoilerText": ""
          }
        ],
        "title": "Cellar Floor Plans — Map Guide"
      },
      {
        "id": "section-1788963624393",
        "steps": [
          {
            "id": "step-1788963671195",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/b30c861f-7fac-4f8d-aef9-e7ff9550e585-bnf.jpeg",
            "title": "Chaos turned into perfection. ✨🍷",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "What began as an overwhelming sea of bottles, slowly — one by one — found its way to perfect order. From floor to shelves, from chaos to beauty. The forgotten cellar is no longer forgotten. It’s complete. ✨🔒",
            "spoilerText": ""
          }
        ],
        "title": "The Completion"
      }
    ]
  },
  {
    "id": "game-1788859533668",
    "title": "Re:Store the Record Store",
    "category": "Organization",
    "coverAlt": "Placeholder cover",
    "gameLink": "https://store.steampowered.com/app/4902600/ReStore_the_Record_Store/",
    "developer": "Double Jump Games",
    "coverImage": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/ca28c222-040a-4a3c-9496-fd22c9e33db2-front.jpeg",
    "editorNote": "I honestly enjoyed this game at first — the idea of restoring a cozy record store and matching vinyl records is such a charming, relaxing concept. That said, it does have noticeable flaws that I and other players have encountered: the game is too dark with no brightness or slider adjustment, it runs poorly even on capable PCs, the interface can be confusing with no clear tutorial, and bugs sometimes kick you back to the menu or break when pressing ESC.\n\nMost importantly, some records and jackets simply don't have matches — I ran into missing sleeves and unpaired vinyl that I could never find anywhere in the shop. Because of this, I couldn't finish the game at all. Without every matchable pair actually present, you're left stuck with records that have no jacket, or jackets with no record, and no way to complete the store.\n\nI’m not sure if these issues have already been fixed in updates. If they haven’t been addressed yet — including the missing matches that prevent completion — I can’t really recommend this game to anyone in its current state. If the devs polish it up, add proper brightness controls, optimize performance, and ensure every record actually has its matching sleeve — it could be truly wonderful. Until then, please keep these points in mind before picking it up.",
    "accentColor": "#E2A88D",
    "description": "Re:Store the Record Store is a game about tidying up an indie record store after the owner had to run off to chase down his escaped monkey. Featuring over 1000 items to pick up, sort through and return back into the crates where they belong. Take your time to look through everything or speedrun it!",
    "walkthrough": [
      {
        "id": "section-1788861816255",
        "steps": [
          {
            "id": "step-1788861820603",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/e1bea907-379a-4032-b76c-1201616c3a8b-chaos.jpg",
            "title": "How It Works",
            "imageAlt": "Step illustration",
            "description": "🔍 Find a loose vinyl → check label for Album Title + Artist\n📂 Find its matching sleeve → artwork & name must match exactly\n✅ Sleeve the record FIRST — unsleeved records won't go into crates!\n🏷️ Identify the genre → file into the matching genre crate\n💡 No time limit! Take your time, or use Genre Glance / Crate Chaser if stuck"
          }
        ],
        "title": "Getting Started"
      },
      {
        "id": "section-1788862551182",
        "steps": [
          {
            "id": "step-1788862612257",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/716e22c5-46f6-4231-afda-208d5ebb8b88-greatest-hits-3.jpg",
            "title": "GREATEST HITS (Second Floor)",
            "imageAlt": "Step illustration",
            "description": "•Desync - Greatest Hits\n•Thirty Minutes To The Moon\n•Plastic Shrine Pilots - Greatest Hits Collection\n•John \"Jazz's Son\" Jackson - Greatest Hits\n•60's - 90's Love Songs - A Heartful Compilation\n•Deaftones - The Greatest\n•Bethany Shears - Greatest Hits:My Privilege\n•Boyz Will Be Boyz - Greatest Hits\n•Sidewalk Boys - All The Hits\n•New Kids On The Street - Ultimate Collection\n•Two Lips - Best Of\n\n📌Note: Three Missing Items"
          },
          {
            "id": "step-1788863277938",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/d4e8528c-69b7-47d3-b8fb-b760c66b25a5-soundtracks.jpg",
            "title": "SOUNDTRACKS (Second Floor)",
            "imageAlt": "Step illustration",
            "description": "•Floatman\n•Housecat Park\n•Hurry Through Time\n•Sisyphus\n•PING\n•Olden Ring\n•Fins\n•The Snow Queen\n•Penultimate Fantasia XXII \n•Larry Hopper - And The Not Quite A Magical Castle\n•Spy On Spy\n•Wargrounds - Good Company\n•All Hallow's Eve\n•Britannie - Music From The Motion Picture\n•Plastic Gear Solid 2"
          },
          {
            "id": "step-1788864234195",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/ef1de9aa-8641-4b8d-b044-5cf11c55561f-reggae.jpg",
            "title": "REGGAE (First Floor)",
            "imageAlt": "Step illustration",
            "description": "•Tom Charlie And The Hollers - Exodia\n•Net Culture - Six Seven Clash\n•Marcus Rossier - Centennial\n•Robbie McFarland -Worry Less, Happiness Comes\n•Jackson Marley - Reggae Country\n•Hoots And The Cattails - Funky Monkey\n•Rob Farley - I Didn't Choose The Reggae Life, The Reggae Chose Me\n•Redman - Mister Redman\n•Dub Nation - Stoned Unturned\n•Beanieguy - The Life And Dream\n•Jonathan Isaacs - Day Trip To The Nurses"
          },
          {
            "id": "step-1788864835621",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/f38bc15d-7295-4c08-95cb-77f3818d58e9-gem-eurobeat.jfif",
            "title": "EUROBEAT (Second Floor)",
            "imageAlt": "Step illustration",
            "description": "•Princess Tokyo - Samurai 1 Lover\n•Kelly - Ringing Speed\n•Artillery Gal\n•Hanz Twister - Intensity\n•Iris - Platinum Boyfriend\n•Meow & Posse - Neon Is The Night\n•Yelena Trisya - Racing Lines\n•7ATE9 - Six Is Afraid\n•Mega RNG Man\n•Takizawa Kanako - Kanaria\n•Rave Dodger - Bring Me Up, Up, Up!\n•Speedstorm - The Night Is Youmg\n•Uberneon - Beats For Speed"
          },
          {
            "id": "step-1788865303293",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/ddd7a974-6a70-4e2a-833f-43eb32aae439-pop.jpg",
            "title": "POP (First Floor)",
            "imageAlt": "Step illustration",
            "description": "•Bartholomeo Samson - Bart\n•The Rapsberry - Everglow\n•Ladiva Zaza - Born To Diva\n•Fido - Out to Lunch\n•Mason Jraz -We Preserve. We Ferment. We Pickle Dill.\n•Rosa Fields - Truly And Floraly Yours\n•Jason Michaels - Rebellion\n•Fowl City - Poultry Eyes\n•Average Garden - Confirmation\n•Tyler Shift - Fearful\n•Cozier - Take Off The Rosters\n•Alicia Rogers - You Look Pretty Happy For Someone With A Broken Heart\\\n•Eraser - I Rub I Rub I Rub\n•Gabriel Peterson - No\n•Beach Girls - Sound Of The Sea"
          },
          {
            "id": "step-1788868227209",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/5c9fabb4-55a3-4371-9bcb-9ac5be895d41-rock.jpg",
            "title": "ROCK (First Floor)",
            "imageAlt": "Step illustration",
            "description": "•Rockettes - It Should Have Been Love\n•The Singularity - Swallowed By The Void\n•Antarctic Simians - AS\n•The Carving Pumpkins - Saudade & the Ethernal Nostalgia\n•Frank Choppa - Parentheses ()\n•Sikh*41 - In Too Drip\n•Distant Horizon - Lift The Moon\n•For Liberty - Free The World\n•30 Minutes To The Moon - Make Love Not War\n•Distant Horizon - A Life Far Away\n•Echo State - Architech Of Silence\n•The Streaks - Pants All Lit Up\n•Ar/Tu - Black Is New Green\n•The Echoes - Waves In Mirrors\n•Valet Parkinglot - Self Titled"
          },
          {
            "id": "step-1788869317692",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/189bc6f5-ff56-40f6-8b47-9dcdf5820aaf-METAL.jpg",
            "title": "METAL (First Floor)",
            "imageAlt": "Step illustration",
            "description": "•Dreamslayer - Bothika\n•System On A Couch - Flanderize\n•Allummica - The Reforgiven\n•Dark Shabbat - Righteous Rio\n•Effervescence - We're Awesome But Were Not Quite Metal\n•Silt & Bone - Grave Lord\n•Race Against The Machina - Escape From The Hell\n•Eternal Torment - Hexenhammer\n•Vindicated Tenfold - World Of Darkness\n•Overeign - Anointing The Unholy\n•Sol Xiphos - Monolith\n•Tigra - Redrum In The Red Room\n•Death Comes For All - Casket Remnants\n•Izzy Azbjorn - Storm Of Izz\n•Fertignudeln - Ramenstrainer"
          },
          {
            "id": "step-1788869956023",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/9479bdd1-8ad9-42b3-a689-bc523cfdc93a-foreign-import-1.jpg",
            "title": "FOREIGN IMPORT (Second Floor)",
            "imageAlt": "Step illustration",
            "description": "•Due Volti, Un Sole - I Ragazzi Del Sole\n•Siyeon - 42 Treasons\n•Noel Lai - Somehow\n•Rouge a Levres Rouge - Une Rose Rose\n•Maan Vaasanai - Agni Raagam\n•Minami Hayakawa - Life On The Wood\n•Ines Vila - Casa De Rosas\n•Aisling - Cailleach\n•Apostolos & The Aegan Sound - Epic Greek Bouzouki\n•Mara - Nche Prptua\n•Hari Hijau - Senapang21\n•Sora Strigoi - Sange/Matase\n•Sakana Ai - Don't Be Koi With Me\n•Los Calljeros Sel Sur - Musica A Paso\n\n📌Note: One Missing Item"
          },
          {
            "id": "step-1788870486935",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/2f68dacd-af38-4ce7-9038-5beba22a96cd-funk-2.jpg",
            "title": "FUNK (First Floor)",
            "imageAlt": "Step illustration",
            "description": "•Funktown Figures - The Fun(k) Never Ends\n•Swiftfoot Boogie - 70's Disco Hits\n•Honey Be Lovely - Lollapalooza\n•Funk Boy Slim Jr- Top Of The Funk\n•The Groove Crew - Disco Wunderland\n•Perriacult - Space Colony\n•Jayquelline - Afrofunk\n•Funk Uncs - Funk Don't Age\n•Rae Whitney - Motown Funk\nSimon Alistair - Doctor Funk\n•Funkenstein's Monsters - Funk Up The Streets\n•Sylvia St, James - Midnight On The Rocks\n•The Hudson Ave. Players - Concrete Soul\n\n📌Note: Two Missing Items"
          },
          {
            "id": "step-1788871067403",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/0fc36d77-b71e-4447-91fc-0493ad723cc5-new-age-1.jpg",
            "title": "NEW AGE (First Floor)",
            "imageAlt": "Step illustration",
            "description": "•Kanon - Magic Circle\n•Riddler - The Rise And The Fall Of\n•Jay Finch _ Deep Brunch\n•Jake Alfield - Plight\n•Evangel - Great Balls Of Fire/Japan\n•Phthia's Dream - Tangerine\n•Ennui - The Memory Of Seas\n•Manhattan Pizzarolls - Air Fraiche\n•Benson Hedges - Storm's A Comin'\n•Lauren Ipsum - Ascendance | Wings\n•Maximillian Ackerman - Tsuuro\n•Kotaro - Velvet Road Vol. 2\n•Philip Arkenstone - Castle In The Sky\n•Leuven - Reiatsu\n•Zedd Winstone - January\n\n📌Note: One Missing Item"
          },
          {
            "id": "step-1788871785967",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/5896f24a-232c-48c9-a6df-282bb19327b1-r-b-4.jpg",
            "title": "R&B (First Floor)",
            "imageAlt": "Step illustration",
            "description": "•Maya E Blige - The Epiphany\n•VLC - Crazy Mad Orange\n•Anne- Marie Carey - Red Hot Peppers\n•Howie Wonder - Tunes In The Octave Of Hope\n•3rd & Main - On The Corner Of Heartbreak\n•Elisha - Keys To The Kingdom\n•Lauren \"Bonne\" Tron - The Misadventures of\n•Ella Baker - Enrapture\n•Weekdys - Closing time\n•Ericka Badeaux - Not In The Lifetime\n•Melvin Hayes - Where's The Love In All This\n•Children Of Fate- Fate Leaves Its Marks On You\n•Joao Santiago - Rhythm Country\n•Daniel Ocean - Brunette\n\n📌Note: Four Missing Items"
          },
          {
            "id": "step-1788872456283",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/5c8e4a9d-44c7-4667-9f35-3a84289a61e5-alt-rock.jpg",
            "title": "ALT ROCK (First Floor)",
            "imageAlt": "Step illustration",
            "description": "•The Feet - Defeat\n•NAUい!\n•Sp{int - Cyderland\n•Peach Jam - Momo\n•Theremedy - Hope\n•Blurp - Dogparklife\n•R.A.M. - Jacks For The People\n•Piealamode - Raspberator\n•Food Fighters _ Beet By Beet\n•Utopia - Evermind\n•Soundfarm - Superknown\n•Bearhunter - Holocron Deceit\n•The Evan Mathers Band - Light At The End Of The Rainbow\n•The Remedy Hope\n•The Clarks - It's Almost Too Late To Listen\n•Cigar Rose - Cigar Rose"
          },
          {
            "id": "step-1788872954455",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/30917246-aa70-4dc5-9d7e-a3b00e432f76-gem-electronica.jfif",
            "title": "ELECTRONICA (Second Floor)",
            "imageAlt": "Step illustration",
            "description": "•Cybermello - The Neon Days\n•Joan Hawkins - Impunity\n•The Electric Electric Parade - Electrovan\n•Chimpanzeez - Ape Days\n•Deaf Funks- Read Only Memories\n•Mirror Heads - Electronicoda\n•Hofurgenic - Bjorse\n•Velvetbow -Dancing With Panzers\n•The Delivery Service - Never Surrender\n•The Alchemical Sisters - Live'99 in New York\n•Livec4t - Specific Album Title\n•7DB - Electroscopy\n•D.Technoparade - World Of Electronica\n•2Eleven - Turn Up Dat Knob"
          },
          {
            "id": "step-1788873603567",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/c9b474e6-6867-475e-be85-700aec631701-emo.jpg",
            "title": "EMO (First Floor)",
            "imageAlt": "Step illustration",
            "description": "•Us Against The World - Realization\n•The Promised Land - Stabbed Through The Chest\n•America Anesthetized - When There's No One Beside You\n•Late To The Wedding - Early To The Funeral\n•The Parade Noid - Memories Of Alphabet Soup\n•James Can't Find His Car - We Have The Figures But We're Missing The Facts\n•Dark Circles - Flares\n•Something Blue - Life In Anger\n•Fifty Two Pilots - Bloody Hands\n•The Weaklies - The Memories That Never Go Away\n•Sierra Lang - Crimson & Cold Shoulder\n•Devils In Confessionals - The Deafening Silence\n•Fueled By Anxiety - The Next Day To Look Towards\n•Manchurian Detail - Emotion Not Found\n•Heyday Procession - A Rose That Blooms Will Wilt Someday"
          },
          {
            "id": "step-1788875100415",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/9f3ad006-2901-4f75-a76e-70ccf69561ef-hiphop-2.jpg",
            "title": "HIP HOP (First Floor)",
            "imageAlt": "Step illustration",
            "description": "•West Canyon - My Delicious Twisted Licorice Stick\n•North & Sovereign - Felling Grace\n•J.V. Kincaid - Doomsbloom\n•Ride Bmx - Raising Eyebrows\n•Nathan The Stallion - Feverish\n•Vanguard & The Wire Wiretapped\n•Bou-G - Leopardprint\n•Blackwood Circle - BC\n•Big Dwayne - 42 Celsiuz\n•Kaden Krose - Politicowl\n•Marrow - interference Experience\n•The Anarchial Collective - I Need A Job\n•The 404 Syndicate - Futures Not Found\n•Isiah Stapler - Heartstopper\n•The Infamous S.M.A.L.L. - Life After Love\n\n📌Note: Two Missing Items"
          },
          {
            "id": "step-1788875991315",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/6e667a68-7ae6-4701-a2f2-89ea41dfdaa9-classical.jpeg",
            "title": "CLASSICAL (First Floor)",
            "imageAlt": "Step illustration",
            "description": "•JS Bach - Modern Sensibilities\n•Tif A. Lockhart - Royal Turkish Chamber Orchestra\n•101 Strings - Philadelphia Philharmonic String Orchestra\n•12 Interpretations of Beethoven's Moonlight Sonata\n•When The Applause Ends\n•Maximillian Adnet - Music For Classical Ballet\n•Dane Sloan - Vivaldi's Four Seasons\n•Bach On Piano - The Distinguishers\n•Harriet Vaanburen - Everyone's Forget About The Lute\n•The Meridian Chamber Orchestra - Unbroken Overture\n•Tatiana Young - Piano Concerts In D Major\n•Antonio Fon Tina Branfort - Live At The Colosseum\n•Adeline Adelbert Verraise - Pure Mozard\n•Luciano & Lucio Bartello - Treble D Major"
          },
          {
            "id": "step-1788877500919",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/da44e6d3-e5e1-4514-9f91-76b54cceeb1a-folk.jpg",
            "title": "FOLK (First Floor)",
            "imageAlt": "Step illustration",
            "description": "•Steel & Port - Counting The Endless Days\n•Avere Brothers - A One And A Two\n•Petty Thief - Odes\n•Of Beast & Women - Above The Spirit\n•Joan Michel - Green \n•Rob Wheelan - The Freestylin'\n•Bon Ete - For You, For Now\n•Pup Suvillian - Bread For The Familyman\n•Leonardo Coen - L'Avventire\n•Dadford & Daughters - Cry No More\n•Finding Joy - Pushing Through The No - Gos In Life\n•Christopher & Glinda Thomason - The End Of The Tunnel\n•Mount Creepy - Lost Comports\n•Lachlan Ridges - Who Is To Say...\n•Screw Eyes - Fiery Morning"
          },
          {
            "id": "step-1788878081887",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/deee9f97-807b-4465-8aa6-2ffd10f5800e-jazz-1.jpg",
            "title": "JAZZ (First Floor)",
            "imageAlt": "Step illustration",
            "description": "•Lenny Rievera - Essential Modern Jazz\n•Adanauer/Simone - '08\n•Ray Coltrane - Jazzy Cat\n•Henry Townsend - The Godfather Of Jazz\n•John Jacobs - Freefor Jazz\n•Eduardo Ramirez - Pure Jazz Concertos\n•Lins|&|Silveira\n•Stefano Confalonieri - Freedom Of Jazz\n•Dexter Franks - Swing Into New York\n•Leroy Winchester - Parside Jazz\n•Glenn Powell Goldman - Gutarismo\n•Various Artists - Jazz: A Concrete History\n•Various Artists - Jazz Masterworks Collection\n•Lawrence Tatum - Jazz Titan\n\n📌Note: One Missing Item"
          },
          {
            "id": "step-1788878789175",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/49fc757a-a5c8-407f-90a3-1bdcfc085a56-blues-3.jpg",
            "title": "BLUES (First Floor)",
            "imageAlt": "Step illustration",
            "description": "•Delta Electric Co. - Mississippi Delta\n•\"Sugarfoot\" Davis - Concrete Jungle Blues\n•Steven Flamene - Blues Cruise\n•Charles Belliant - Chicago Blues\n•William \"Soul King\" Tomas - The Blues\n•Eddie Stirling - Last Call In Chicago\n•Beale Street Syndicate - 3am Breakdown\n•Peter Timothy Cullen - Deep Night Blues\n•Ace Of Bass - All The Blues That You Want\n•Frederick E.L. Malone - 1,2, The Blues Is Coming For You\n•Deacon Clayton - Soulful Sessions\n•Otis \"Blind Eye\" Vance - Rusty Wine And Gin\n•The Sweet Street Blues Gang\n\n📌Note: Three Missing Items"
          },
          {
            "id": "step-1788879304115",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/3ba635db-def7-405c-bc80-2124954ac4bc-country-1.jpg",
            "title": "COUNTRY (First Floor)",
            "imageAlt": "Step illustration",
            "description": "•Jessica Twain - The Cowgirl In Me\n•Eli Jennings - Dennies & Pavement\n•Wild Bill Tannen - Rockabilly Country\n•Savannah Hart - Country Gal\n•Gareth Franklin Rhodes - When The Dust Settles\n•Jenna Rink - They Only Tell You Not To Cry\n•Randy Taylor - One Man's Youth\n•Blake Nelson - Twelve Frets To Memphis\n•Daniel Baker - Golden Hour Sessions\n•Thomas \"Woody\" Franks - There's A Snake In My Boots\n•Frank Jamesone -Pompadours And Bouffants\n•The Polyphonies - Dance Country\n•The Brothers Branscombe - 50 Miles To Tennesse\n•Timmy Credit - The Legend Of Timmy Credit\n\n📌Note: One Missing Item"
          },
          {
            "id": "step-1788880238112",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/df3afe23-6f66-4dfc-b42e-2c536bb632f1-new-arrivals.jpg",
            "title": "NEW ARRIVALS (First Floor) ",
            "imageAlt": "Step illustration",
            "description": "•Tales From The Scarlet Windmill\n•Pink Void - Wrong Side Of The Moon\n•The Falling Stones - Lickety Split\n•Geezer - Un Album Blea\n•Alvin Priestly - Alvin Priestly\n•The Monkeys - Great Vibes\n•Tara Brisk - 2026\n•Avaricious D - The Capo Of Destiny\n\n📌Note: I think this is just a bonus. Not really sure, though."
          }
        ],
        "title": "Records By Genre (Master List)"
      }
    ]
  },
  {
  "id": "game-1789682891873",
  "title": "TV Archive: Tidy Up Together",
  "category": "Cozy Games",
  "coverAlt": "TV Archive: Tidy Up Together cover",
  "gameLink": "https://store.steampowered.com/app/4934370/TV_Archive_Tidy_Up_Together/",
  "developer": "Games Together",
  "coverImage": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/965b0ece-78d5-4df7-a6b0-d448a77bdc14-title.webp",
  "editorNote": "",
  "accentColor": "#ff5100",
  "description": "Shelve the videotapes, unlock new skills, and use your unique methods to tidy up the TV archive. Enjoy the online co-op and online PvP with your friends, or go solo! Fill up the shelves and experience a sense of relief and satisfaction.",
  "walkthrough": [
    {
      "id": "section-1789683363480",
      "title": "Basics & Game Modes",
      "steps": [
        {
          "id": "step-1789683374918",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/22b4ab65-1442-4f51-90be-9a897794f65f-first.webp",
          "title": "Choose Your Playstyle",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "Pick the mode that fits you best:\n\n•Single Player — work through the archive at your own pace, quietly and methodically\n•Online Co-op — tidy up together with friends, split tasks and share the work\n•Online PvP — compete to sort tapes faster and plan the most efficient routes\n•Sandbox Mode — every skill is unlocked from the start; experiment freely\n•No-Skill Mode — no assists at all; pure manual sorting for the full challenge",
          "spoilerText": ""
        },
        {
          "id": "step-1789684203431",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/989424c9-a5b5-4425-a9d8-d0869ec52d14-controls.webp",
          "title": "Learn the Controls & Skills",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "Pick up tapes, check their labels, and place them on the matching shelf. As you sort, earn points to unlock skills:\n\n•Sort Numerically — auto-orders tapes in your hand by number\n•Highlight Shelf — lights up exactly where your top tape belongs\n•Highlight Tapes — marks all matching tapes of the same type\n•Auto-Placement — sets tapes correctly on the shelf automatically\n•Auto-Collect — instantly gathers matching tapes from around the room",
          "spoilerText": ""
        },
        {
          "id": "step-1789684434732",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/a8bc4d9b-c4da-4a7d-9f78-6fd4bf597dd1-maps.webp",
          "title": "Know Where Every Tape Belongs",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "Every videotape goes to one dedicated category shelf. Use this list to place items instantly — or rely on the in-game map and shelf signs to guide you.",
          "spoilerText": ""
        }
      ]
    },
    {
      "id": "section-1789684404976",
      "title": "Master List — All 20 Categories",
      "steps": [
        {
          "id": "step-tv-1-1789684400100",
          "title": "1. ACTION MOVIES",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/d8d9732b-fc2a-488f-8e9d-7288b228c04f-1---action-movies.webp",
          "imageAlt": "ACTION MOVIES shelf videotapes",
          "hasSpoiler": false,
          "description": "•Assassins and Companions\n•Cowboy Westwood\n•Gladiator Maximus\n•Gold, Bold, and Uncle\n•Green Beret Veteran: Kill\n•Green Beret Veteran: Survive\n•Guardians of the Ocean\n•Hell Weapon I\n•Hell Weapon II\n•Hell Weapon III\n•Outlaw Westwood\n•Thieves of the Land\n•Utopia Priests I\n•Utopia Priests II\n•Utopia Priests III",
          "spoilerText": ""
        },
        {
          "id": "step-tv-2-1789684400200",
          "title": "2. DRAMA MOVIES",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/36c585b3-9b98-42d0-a1d7-6a14014a50b1-2---drama-movies.webp",
          "imageAlt": "DRAMA MOVIES shelf videotapes",
          "hasSpoiler": false,
          "description": "•A Beautiful Mind\n•Cuckoo's Nest\n•Ghost Field\n•Hopeless Romantic\n•Immigrant Story\n•Orphan's Destiny\n•Rain Over Autumn\n•Shadows of Yesterday\n•The Pianist of Warsaw\n•The Silent River",
          "spoilerText": ""
        },
        {
          "id": "step-tv-3-1789684400300",
          "title": "3. TV SERIES",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/2e6fd3e3-0716-4b52-9a71-5fafe4761eee-3---tv-series.webp",
          "imageAlt": "TV SERIES shelf videotapes",
          "hasSpoiler": false,
          "description": "•Detective Blue: Season 1-5\n•Hospital Central: Seasons 1-8\n•Midnight Dynasty\n•Office Confidential\n•The Coastal Town Mysteries\n•The Northern Crown\n•Undercover Metro",
          "spoilerText": ""
        },
        {
          "id": "step-tv-4-1789684400400",
          "title": "4. CARTOONS",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/7c8d06e7-504e-486d-9601-eb86f10e2db7-4--cartoons.webp",
          "imageAlt": "CARTOONS shelf videotapes",
          "hasSpoiler": false,
          "description": "•Adventures of Bunny Bob\n•Cosmic Cat & Dog\n•Dino Squad Adventures\n•Fairy Forest Tales\n•Little Engine Sparks\n•Magic School bus Patrol\n•Space Rangers Academy",
          "spoilerText": ""
        },
        {
          "id": "step-tv-5-1789684400500",
          "title": "5. HORROR MOVIES",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/55fede71-5bd5-4b30-99e4-f1928c660f27-5---horror-movies.webp",
          "imageAlt": "HORROR MOVIES shelf videotapes",
          "hasSpoiler": false,
          "description": "•Cabin by the Mire\n•Dark Descent\n•Haunted Basement Tape\n•Midnight Visitor\n•Night of the Scarecrow\n•The Attic Whispers\n•The Cursed Reel",
          "spoilerText": ""
        },
        {
          "id": "step-tv-6-1789684400600",
          "title": "6. COMEDY MOVIES",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/84740f83-6faf-4905-9f5b-71dcf0c95007-6---comedy-movies.webp",
          "imageAlt": "COMEDY MOVIES shelf videotapes",
          "hasSpoiler": false,
          "description": "•Bad Luck Brothers\n•Crazy Family Reunion\n•Delivery Mayhem\n•Double Trouble Vacation\n•Goofy Golfers\n•Summer Camp Disaster\n•Uncle Bob's Dilemma",
          "spoilerText": ""
        },
        {
          "id": "step-tv-7-1789684400700",
          "title": "7. ATHLETIC GAMES",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/34a32b0f-52fb-496e-9f11-bf938e96df3c-7---athletic-games.webp",
          "imageAlt": "ATHLETIC GAMES shelf videotapes",
          "hasSpoiler": false,
          "description": "•City Marathon Highlights\n•Decathlon Championship\n•Gold Sprint Final\n•High Jump Invitational\n•National Gymnastics Open\n•Track & Field Relays",
          "spoilerText": ""
        },
        {
          "id": "step-tv-8-1789684400800",
          "title": "8. FOOTBALL CUPS",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/2d7efabf-cb38-47ee-a1d5-fe9ed6f2e36a-8---football-cups.webp",
          "imageAlt": "FOOTBALL CUPS shelf videotapes",
          "hasSpoiler": false,
          "description": "•All-Star Football League\n•Continental Champions Cup\n•Derby Cup Classics\n•Golden Boot Finals\n•Premier Cup Highlights\n•World Football Showdown",
          "spoilerText": ""
        },
        {
          "id": "step-tv-9-1789684400900",
          "title": "9. ROMANCE MOVIES",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/639c8604-ad04-48c0-8912-6949f7ec3a69-9---romance-movies.webp",
          "imageAlt": "ROMANCE MOVIES shelf videotapes",
          "hasSpoiler": false,
          "description": "•A Kiss Under the Rain\n•Letters from Vienna\n•Love Across Time\n•Midnight Promenade\n•Sunset Harbor Romance\n•The Florist's Secret\n•Winter Whispers",
          "spoilerText": ""
        },
        {
          "id": "step-tv-10-1789684401000",
          "title": "10. SCI-FI MOVIES",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/1a0f2396-9c18-40af-af5e-1bcd5431ad05-10---sci-fi-movies.webp",
          "imageAlt": "SCI-FI MOVIES shelf videotapes",
          "hasSpoiler": false,
          "description": "•Cyber Horizon 2099\n•Deep Cosmos Explorer\n•Neon City Fugitive\n•Orbital Protocol\n•Solar Storm Alert\n•The Quantum Gate\n•Time Loop Paradox",
          "spoilerText": ""
        },
        {
          "id": "step-tv-11-1789684401100",
          "title": "11. BASEBALL",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/1249e0a9-ae30-446c-b681-4e2866436f64-11---baseball.webp",
          "imageAlt": "BASEBALL shelf videotapes",
          "hasSpoiler": false,
          "description": "•Championship Series 1994\n•Diamond Legends Showcase\n•Grand Slam Extravaganza\n•Home Run Derby Classics\n•Pitcher's Duel Golden Era\n•World Diamond Classic",
          "spoilerText": ""
        },
        {
          "id": "step-tv-12-1789684401200",
          "title": "12. TENNIS",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/a404afcc-7a0f-4ad2-b281-3b37700e294f-12---tennis.webp",
          "imageAlt": "TENNIS shelf videotapes",
          "hasSpoiler": false,
          "description": "•Clay Court Masters\n•Grass Court Championship Final\n•Hardcourt Smash Open\n•Legendary Aces & Rallies\n•Silver Cup Doubles Classic",
          "spoilerText": ""
        },
        {
          "id": "step-tv-13-1789684401300",
          "title": "13. NEWS",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/8309df9a-ed6c-422a-bc13-b325d65b55fe-13---news.webp",
          "imageAlt": "NEWS shelf videotapes",
          "hasSpoiler": false,
          "description": "•Evening Broadcast Archive\n•Global Morning Report\n•Historical Headlines Reel\n•Metro Daily Dispatch\n•Nightly World Review\n•Special Election Coverage",
          "spoilerText": ""
        },
        {
          "id": "step-tv-14-1789684401400",
          "title": "14. GAME SHOWS",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/a64f71bf-7bf5-4126-a0ec-fd71c09b4cca-14---game-shows.webp",
          "imageAlt": "GAME SHOWS shelf videotapes",
          "hasSpoiler": false,
          "description": "•Fortune Wheel Spectacular\n•Million Dollar Quiz Hour\n•Puzzle Master Challenge\n•Spin & Win Jackpot\n•Trivia Champions Tournament",
          "spoilerText": ""
        },
        {
          "id": "step-tv-15-1789684401500",
          "title": "15. BASKETBALL",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/28f5d6a7-40be-4110-92d2-74a35ee749f8-15---basketball.webp",
          "imageAlt": "BASKETBALL shelf videotapes",
          "hasSpoiler": false,
          "description": "•All-Star Slam Dunk Contest\n•Championship Game 7 Thriller\n•Courtside Classic Highlights\n•Fast Break Dynasty\n•Rookies Showcase Match",
          "spoilerText": ""
        },
        {
          "id": "step-tv-16-1789684401600",
          "title": "16. MOTORSPORTS",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/15cbd602-dce9-466a-a632-0d60a63b0eac-16---motorsports.webp",
          "imageAlt": "MOTORSPORTS shelf videotapes",
          "hasSpoiler": false,
          "description": "•24-Hour Endurance Classic\n•Desert Rally Raid Cup\n•Grand Circuit GP Highlights\n•Night Speedway Drag\n•Turbo Cup Championship",
          "spoilerText": ""
        },
        {
          "id": "step-tv-17-1789684401700",
          "title": "17. COOKING SHOWS",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/8b8def26-0d81-4917-9967-a4072d78f749-17---cooking-shows.webp",
          "imageAlt": "COOKING SHOWS shelf videotapes",
          "hasSpoiler": false,
          "description": "•Artisan Bakery Secrets\n•Chef's Kitchen Masterclass\n•Grand Pastry Showdown\n•Rustic Italian Flavors\n•Street Food World Tour",
          "spoilerText": ""
        },
        {
          "id": "step-tv-18-1789684401800",
          "title": "18. DOCUMENTARIES",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/5bad076d-d6a0-451e-b155-cc2d40a839f3-18---documentaries.webp",
          "imageAlt": "DOCUMENTARIES shelf videotapes",
          "hasSpoiler": false,
          "description": "•Deep Ocean Mysteries\n•Kingdom of the Savanna\n•Lost Cities of the Sahara\n•Our Living Planet\n•Secrets of the Pyramids\n•The Cosmic Frontier",
          "spoilerText": ""
        },
        {
          "id": "step-tv-19-1789684401900",
          "title": "19. BOXING",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/7e51aa15-c149-4b05-b147-7a8ecebbff55-19---boxing.webp",
          "imageAlt": "BOXING shelf videotapes",
          "hasSpoiler": false,
          "description": "•Golden Gloves Championship\n•Heavyweight Title Clash\n•Iron Fist Invitational\n•Legendary Knockouts Reel\n•Undisputed Round-by-Round",
          "spoilerText": ""
        },
        {
          "id": "step-tv-20-1789684402000",
          "title": "20. TALK SHOWS",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/07babf7d-c3b1-46fd-8c2a-a8d24c11e032-20---talk-showa.webp",
          "imageAlt": "TALK SHOWS shelf videotapes",
          "hasSpoiler": false,
          "description": "•Celebrity Spotlight Live\n•Late Night Lounge Hour\n•Morning Coffee Chat\n•Prime Time Roundtable\n•Weekend Entertainment Special",
          "spoilerText": ""
        }
      ]
    },
    {
      "id": "section-1789684499000",
      "title": "Chaos Mode & Challenge",
      "steps": [
        {
          "id": "step-1789684499001",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/30d042ba-0a36-4036-ab02-0e82a032d71f-chaos.webp",
          "title": "Tackling Chaos Mode",
          "imageAlt": "Chaos mode tapes scattered",
          "hasSpoiler": false,
          "description": "In Chaos Mode, dozens of unsorted tapes are strewn across the floor and counters. Prioritize unlocking Auto-Collect and Highlight Tapes to clear the floor systematically by room quadrant.",
          "spoilerText": ""
        },
        {
          "id": "step-1789684499002",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/c2fe05e3-876e-42f2-ad6f-2bf9a59f9db5-after-chaos.webp",
          "title": "After Chaos — Final Archive Completion",
          "imageAlt": "Clean TV archive shelves completed",
          "hasSpoiler": false,
          "description": "Once all tapes are placed and shelves are filled, check each section sign to confirm 100% completion. Enjoy the pristine, fully organized TV archive room!",
          "spoilerText": ""
        }
      ]
    }
  ]
},
{
  "id": "game-1791078132017",
  "title": "Megastore: Tidy Up Together",
  "category": "Cozy Games",
  "coverAlt": "Placeholder cover",
  "gameLink": "https://store.steampowered.com/app/5027520/Megastore_Tidy_Up_Together/",
  "developer": "Yolo Games Studio",
  "coverImage": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/7174bce3-2a92-4206-b057-c85454c85038-tite.webp",
  "editorNote": "I’ve loved every minute with Megastore: Tidy Up Together, and I’m happy to say my experience was completely smooth — no bugs, no confusion, no mismatches at all. Every item lines up exactly with its shelf label; what you see is exactly where it goes. The scale is impressive too — from the cosy first store to the huge two-story Megastore, the variety never lets up. With over 1,350 unique products and a skill tree that lets you play your own way, it’s polished, reliable, and genuinely satisfying from start to finish.\n\nWhether you want a quiet solo tidy-up or something to share with friends, I highly recommend this one. It delivers exactly what it promises — and it does it beautifully.\n\nHave you played it? How did you find your favourite department? I’d love to hear your thoughts — feel free to share your experience in the comments below!",
  "accentColor": "#4b607c",
  "coverImages": [
    "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/7174bce3-2a92-4206-b057-c85454c85038-tite.webp"
  ],
  "description": "Megastore: Tidy Up Together is a cozy sorting game for solo or online co-op play. Organize four stores of increasing scale: a Toy Store, an Electronics Store, a bustling Supermarket, and a massive two-story Megastore. Pick up, sort, and shelve thousands of items, and get ready to open!",
  "walkthrough": [
    {
      "id": "section-1791078622241",
      "steps": [
        {
          "id": "step-1791080308395",
          "image": "",
          "title": "Available Stores / Levels",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "The game currently features multiple stores that increase in size and difficulty:\n\n📍Toy Store\n\n•Smallest and easiest level.\n•Great for learning the sorting mechanics.\n•Mainly toys, pool items, and seasonal products.\n\n📍Supermarket\n\n•Larger store with many food and household products.\n•Requires more careful organisation because of the variety of departments.\n•A good step up in complexity from the Toy Store.\n\n📍Megastore\n\n•The biggest challenge.\n•Features a huge number of products spread across multiple departments and floors.\n•Best tackled with friends or by dividing sections into smaller tasks.\n\n🖇️Note: A newer Electronics Store level has also been added, featuring thousands of electronic products and appliances.",
          "spoilerText": ""
        },
        {
          "id": "step-1791080372439",
          "image": "",
          "title": "Quick Walkthrough",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "1. Learn the Layout\n\nWhen entering a store, take a quick walk through each department. Shelf signs show where item categories belong.\n\n2. Sort by Category First\n\nInstead of placing items one at a time, gather similar products together. This makes shelving much faster.\n\n3. Start with Large Sections\n\nClear big piles near department entrances first. You'll create more space to move around and spot item groups easier.\n\n4. Use Teamwork\n\nIn multiplayer:\n\nAssign players to different departments.\nOne player can sort while another shelves items.\nCommunicate where uncommon products belong.\n\n5. Finish Shelf Organisation\n\nAfter everything is placed, tidy shelves so matching products are grouped neatly together for maximum efficiency.",
          "spoilerText": ""
        },
        {
          "id": "step-1791080562525",
          "image": "",
          "title": "Beginner Tips",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Don't worry about perfection at the start; focus on getting items into the correct department.\n•Memorise common shelf locations to speed up future runs.\n•Large stores become much easier when tackled section by section.\n•Co-op significantly reduces completion time.",
          "spoilerText": ""
        },
        {
          "id": "step-1791080620941",
          "image": "",
          "title": "Final Goal",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "By correctly sorting and shelving every item, you'll transform a chaotic store into a clean, organised shopping space ready for customers. The challenge grows from the simple Toy Store, through the Supermarket, and finally the massive Megastore, making each level feel bigger and more rewarding than the last.",
          "spoilerText": ""
        }
      ],
      "title": "Quick Game Guide"
    },
    {
      "id": "section-1791080639253",
      "steps": [
        {
          "id": "step-1791080912017",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/9cfbcc73-e3c5-45fc-910f-9d3370a35f68-bags.webp",
          "title": "BAGS",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Butterfly Beach Bag\n•Hibiscus Beach Bag\n•Striped Surfboard Beach Bag\n•Summer Beach Bag\n•Sunset Beach Bag\n•Surf Beach Bag",
          "spoilerText": ""
        },
        {
          "id": "step-1791081753869",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/01df3850-2529-4629-9a73-afe87898f8cb-balls.webp",
          "title": "BALLS",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•American Football\n•Blue Basketball\n•Blue Volleyball\n•Classic Basketball\n•Classic Football\n•Color Football\n•Color Volleyball\n•Kids Ball\n•Pink Basketball",
          "spoilerText": ""
        },
        {
          "id": "step-1791082000817",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/2035f4d9-91de-450e-b994-928c4437208e-BEACH-UMBRELLAS.webp",
          "title": "BEACH UMBRELLAS",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Aqua Stripe Umbrella\n•Blue Stripe Umbrella\n•Green Stripe Umbrella\n•Orange Stripe Umbrella\n•Purple Stripe Umbrella\n•Red Stripe Umbrella",
          "spoilerText": ""
        },
        {
          "id": "step-1791082301872",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/487347c2-cd03-498b-abd1-fe02ff3a42fa-BOARD-GAMES.webp",
          "title": "BOARD GAMES",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Ancient Egyptian Board Game\n•Battlestar Board Game\n•Blockout Board Games\n•Carnival Crazy Board Game\n•Cash in Hand Board Game\n•Classic Checkers Board Game\n•Classic Chess Board Game\n•Clumsy Board Game\n•Dangerous Diamonds Board Game\n•Detective Files Board Game\n•Enchanted Party Game\n•Fishing Board Game\n•Planet Zantibar Board Game\n•Terror Tower Board Game\n•Thunder Grid Board Game\n•Wooden Checkers Game Board",
          "spoilerText": ""
        },
        {
          "id": "step-1791082996878",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/831df5f6-45e8-47ee-9755-a7f247ab4edd-dolls.webp",
          "title": "DOLLS",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Baby Doll Set\n•Casual Set\n•Denim Outfit Set\n•Doodle Board\n•Fairy Dress Set\n•Glam Set\n•Night Out Set\n•Pink Dress Set\n•Ponies Pack\n•Summer Set\n•Red Dress Set\n•Twin Baby Dolls",
          "spoilerText": ""
        },
        {
          "id": "step-1791083539924",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/b049bbf7-9f25-4f4c-9e2e-c6f4d1622163-educational-toys.webp",
          "title": "EDUCATIONAL TOYS",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Blocks Crane\n•Eudcation Set\n•Educational Bead Maze\n•Hammer Game\n•Learning Laptop\n•Toolbox\n•Letter Puzzle (A-Z, 18 each)",
          "spoilerText": ""
        },
        {
          "id": "step-1791083819957",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/e95db48e-d020-449e-a809-d4db0c3f28f7-flip-flops.webp",
          "title": "FLIP-FLOPS",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Blue Flip-Flops\n•Coral Flip-Flops\n•Lime Flip-Flops\n•Pink Flip-Flops\n•Purple Flip-Flops\n•Purple Flip-Flops\n•Yellow Flip-Flops",
          "spoilerText": ""
        },
        {
          "id": "step-1791084002205",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/52fea6f3-99c5-4ea3-bb63-459f52377e02-hats---caps.webp",
          "title": "HATS & CAPS",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Flower Beach Hat\n•Happy Face Cap\n•Mint Spirit Cap\n•Ocean Blue Cap\n•Pineapple Sun Hat\n•Royal Vibe Cap\n•Shadow Camo Cap\n•Straw Summer Hat\n•Street Tag Cap\n•Travel Print Hat\n•Urban Hero Cap\n•Vintage Brown Cap",
          "spoilerText": ""
        },
        {
          "id": "step-1791084601809",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/ea2679b5-a7ff-44e8-9862-7cf5894b6c80-MUSICAL-TOYS.webp",
          "title": "MUSICAL TOYS",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Electric Guitar\n•Electric Piano\n•Instrumental Set\n•Toy Piano",
          "spoilerText": ""
        },
        {
          "id": "step-1791084711973",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/c9a0659e-29b4-43b6-9563-efea19e59c8e-plushies-2.webp",
          "title": "PLUSHIES",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Apple Plushie\n•Avocado Plushie (Big)\n•Avocado Plushie (Small)\n•Black Cat Keychain\n•Black Cat Plushie\n•Black Sheep Plushie\n•Black Shark Plushie\n•Calico Cat Keychain\n•Calico Cat Plushie\n•Camo Round Plushie\n•Clownfish Plushie\n•Dinosaur Plushie\n•Dotted Round Plushie\n•Elephant Plushie\n•Floppy-Ear Dog Plushie\n•Ginger Cat Keychain\n•Ginger Cat Plushie\n•Grey Cat Keychain\n•Grey Cat Plushie\n•Grey Round Plushie\n•Grey Shark Plushie\n•Green Apple Plushie\n•Honey Round Plushie\n•Lemon Plushie\n•Lemon Round Plushie\n•Leopard Cat Keychain\n•Leopard Cat Plushie\n•Party Frog Plushie\n•Patch Round Plushie\n•Pear Plushie\n•Penguin Plushie\n•Pink Shark Plushie\n•Red Apple Plushie\n•Round Seal Plushie\n•Round Shark Plushie\n•Siamese Cat Keychain\n•Siamese Cat Plushie\n•Smoky Cat Keychain\n•Smoky Cat Plushie\n•Splash Round Plushie\n•Spotted Cat Plushie\n•Starry Round Plushie\n•Striped Bee Plushie\n•Striped Cat Keychain\n•Striped Cat Plushie\n•Tiger Plushie\n•Tortoiseshell Cat Plushie\n•Turtle Plushie\n•Tuxedo Cat Keychain\n•Tuxedo Cat Plushie\n•White Sheep Plushie\n•White Tiger Plushie",
          "spoilerText": ""
        },
        {
          "id": "step-1791100313879",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/1e70b4c0-455b-4d9e-86e4-984f3cd63848-pool-balls---noodles.webp",
          "title": "POOL BALLS & NOODLES",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Blue Pool Noodle\n•Classic Beach Ball\n•Green Pool Noodle\n•Ocean Beach Ball\n•Red Pool Noodle\n•Turtle Beach Ball",
          "spoilerText": ""
        },
        {
          "id": "step-1791100446336",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/3725bead-9f95-4e75-ab0b-136a043b36ea-pool-floats.webp",
          "title": "POOL FLOATS",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Blue Flamingo Ring\n•Orange Air Mattress\n•Orange Flamingo Ring\n•Pink Flamingo Ring\n•Tropical Air Mattress\n•Vacation Air Mattress",
          "spoilerText": ""
        },
        {
          "id": "step-1791100607030",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/e76cbb99-b8c7-428f-8b5a-a3f86bff0249-retro-toys.webp",
          "title": "RETRO TOYS",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Retro Abacus\n•Retro Blue Lava Lamp\n•Retro Blue Yo-Yo\n•Retro Green Lava Lamp\n•Retro Green Yo-Yo\n•Retro Light-Up Memory Game\n•Retro Magnetic Drawing Board\n•Retro Maracas\n•Retro Purple Lava Lamp\n•Retro Ring Tower\n•Retro Xylophone\n•Retro Yellow Lava Lamp",
          "spoilerText": ""
        },
        {
          "id": "step-1791101282095",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/958410f7-5c3e-41f6-8272-12c333826dc0-sun---swim.webp",
          "title": "SUN & SWIM",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Bug Spray\n•Blue Swim Fins\n•Red Swim Fins\n•Spf 30 Lotion\n•Spf 50 Cream\n•Sun Spray\n•Tan Oil\n•Yellow Swim Fins",
          "spoilerText": ""
        },
        {
          "id": "step-1791101671758",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/1f71dcaf-a036-41a4-a4cd-6ead03a1e2a5-swim-rings.webp",
          "title": "SWIM RINGS",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Green Swim Rings\n•Large Blue Swim Ring\n•Large Colorful Swim Ring\n•Large Tropical Swim Ring\n•Sailor Swim Ring\n•Sea Life Swim Ring",
          "spoilerText": ""
        },
        {
          "id": "step-1791101835126",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/b672e3f8-385e-4e58-8101-b8f4a6da7bfa-towels.webp",
          "title": "TOWELS",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Aqua Striped Large Towel\n•Aqua Striped Medium Towel\n•Forest Green Large Towel\n•Forest Green Medium Towel\n•Rainbow Striped Large Towel\n•Red Striped Large Towel\n•Red Striped Medium Towel\n•Sunny Striped Medium Towel",
          "spoilerText": ""
        },
        {
          "id": "step-1791102178731",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/9afffba9-bb5c-443b-9f66-c8ba53b63f33-toy-figures.webp",
          "title": "TOY FIGURES",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Battle Axe Figure Accessory\n•Battle Shield Figure Accessory\n•Blaster Figure Accessory\n•Blue T-Rex Toy\n•Google Monkey Figure\n•Green Alien Figure\n•Green Monster Figure\n•Green T-Rex Toy\n•Hazmat Trooper Figure\n•Mad Scientist Figure\n•Masked Wrestler Figure\n•Police Officer Figure\n•Samurai Sword Figure Accessory\n•Space Ranger Figure\n•Space Robot Figure\n•Viking Warrior Figure",
          "spoilerText": ""
        },
        {
          "id": "step-1791103092189",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/78f0af08-564a-4ddf-9bf1-1404e7f97507-toy-vehicle.webp",
          "title": "TOY VEHICLE",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Army Toy Boat\n•Army Toy Helicopter\n•Beige Toy Van\n•Blue Sports Car (2)\n•Blue Toy Van\n•Blue Train Wagon\n•Blue Wooden Car\n•Camper Van\n•Galloper XL\n•Gray Sports Car\n•Green Wooden Car\n•Mini Remote Car\n•Mint Wooden Car\n•Orange Sports Car\n•Orange Toy Van\n•Orange Wooden Car\n•Pink Sports Car (2)\n•Pink Toy Van\n•Police Car\n•Purple Sports Car\n•Purple Wooden Car\n•Push Car\n•Red Sports Car (2)\n•Red Toy Locomotive\n•Red Wooden Car\n•Remote Control Truck\n•Ride-On Coupe\n•Sedan\n•Tank\n•Toy Train Station\n•Van 2\n•Yellow Train Wagon \n•Yellow Wooden Car",
          "spoilerText": ""
        },
        {
          "id": "step-1791105488807",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/3bcadd1b-80e2-41e6-995b-7735d02d78ab-treats---accessories.webp",
          "title": "TREATS & ACCESSORIES",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Blueberry Cotton Candy\n•Candy Bag - Blue\n•Candy Bag - Orange\n•Candy Bag - Pink\n•Candy Bag - Yellow\n•Choco Bites - Blue\n•Choco Bites - Brown\n•Choco Bites - Orange\n•Choco Bites - Purple\n•Cloud Cotton Candy\n•Energy Jelly - Lemon\n•Energy Jelly - Lime\n•Energy Jelly - Orange\n•Energy Jelly - Peach\n•Mint Cotton Candy\n•Necklace - Blue\n•Necklace - Green \n•Necklace - Orange\n•Necklace - Pink\n•Strawberry Cotton Candy\n•Sweeties - Green\n•Sweeties -Purple\n•Sweeties -Red\n•Sweeties -Yellow\n•Xylitol - Berry\n•Xylitol - Grape\n•Xylitol - Lemon\n•Xylitol - Original",
          "spoilerText": ""
        },
        {
          "id": "step-1791106809478",
          "image": "",
          "title": "PRETEND PLAY",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Blue Toy Cup\n•Chestnut Toy Pony\n•Cream Toy Pony\n•Dream Mansion\n•Pink Toy Cup\n•Purple Toy Cup\n•Rainbow Toy Pony\n•Sweet Doll House\n•Toy Cooking Pot\n•Toy Fork\n•Toy Frying Fan\n•Toy Plate\n•Toy Rolling Pin\n•Toy Spatula\n•White Toy Cup\n•White Toy Pony",
          "spoilerText": ""
        }
      ],
      "title": "Toy Store (Single-story --- your starting location)",
      "video": ""
    },
    {
      "id": "section-1791107043703",
      "steps": [
        {
          "id": "step-1791107072978",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/91be56eb-2bac-4a31-ae5b-cee311c96aab-bakery---bread.webp",
          "title": "BAKERY - Bread",
          "video": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-videos/walkthrough-videos/bbc1ed13-4149-46cd-8684-3f772055361d-bread.optimized.webm",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Chia Seed Bread\n•Ciabatta\n•Crispbread\n•Dark Multigrain Bread\n•Oatbread\n•Olive Bread\n•Plum Bread\n•Round Bread\n•Rustic Round Loaf\n•Sesame Ring Bread\n•Spelt Bread\n•Turkish Pide\n•Village Bread\n•Wheat Loaf (2)",
          "spoilerText": "",
          "videoPoster": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-videos/walkthrough-posters/aac2ae6a-4ea0-4ab5-abc9-990d805b4c74-bread-poster.webp"
        },
        {
          "id": "step-1791107759351",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/00ce7633-9795-4bb3-bfc1-8cb64e6226a8-bakery---rolls---baguettes.webp",
          "title": "BAKERY - Rolls & Baguettes",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Bagel\n•Baguette (Artisan)\n•Baguettes\n•Bread Roll\n•Breadstick\n•Chia Roll\n•Classic Baguette\n•Garlic Breadstick\n•Pumpkin Seed Roll\n•Rustic Roll\n•Seeded Roll\n•Vienna Roll",
          "spoilerText": ""
        },
        {
          "id": "step-1791108211098",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/fa58da38-f8e6-49fe-98fa-31897dc4392c-bakery---sweet-bakes.webp",
          "title": "BAKERY - Sweet Bakes",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Chocolate Drizzle Donut\n•Cupcake\n•Pink Frosted Donut\n•Plain Donuts\n•Powdered Donut\n•Waffle",
          "spoilerText": ""
        },
        {
          "id": "step-1791108333510",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/6a225d0f-87a5-404b-ad3b-0e06bc168cc1-books.webp",
          "title": "BOOKS",
          "video": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-videos/walkthrough-videos/fee81466-3920-4017-8981-73c7ea31fbb6-books.optimized.webm",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•A Dynamical Theory of the Electromagnetic Field\n•ABC Book\n•Colors\n•Donnyine\n•I Won't Share\n•Krok\n•Mother & Child\n•Once Upon A Time\n•Piticha\n•The Adventure of the Muddle-Headed Wombat\n•The Surprise Book\n•Vintage Story Book",
          "spoilerText": "",
          "videoPoster": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-videos/walkthrough-posters/4aba44d0-caac-44e4-9147-36f6793ed988-books-poster.webp"
        },
        {
          "id": "step-1791108665925",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/79473935-299f-4f39-baf2-bced19309e7e-butchery---beef.webp",
          "title": "BUTCHERY - Beef",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Beef Liver Slice\n•Beef Tongue Slice\n•Bone-in Short Ribs\n•Brisket Slices\n•Flank Steak\n•Packed Ground Beef 70/30\n•Packed Ground Beef 75/25\n•Packed Ground Beef 90/10\n•Packed Ground Beef 93/7\n•Ribeye steak\n•Tenderloin Steak\n•Tomahawk Steak",
          "spoilerText": ""
        },
        {
          "id": "step-1791109157845",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/2dda2eaa-e5c4-4229-9cfe-643eb05ed347-BUTCHERY---chicken---turkey.webp",
          "title": "BUTCHERY - Chicken & Turkey",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Packed Chicken Breasts\n•Packed Chicken Leg Quarters\n•Packed Chicken Tenderloins\n•Packed Ground Chicken\n•Packed Ground Turkey\n•Packed Whole Chicken",
          "spoilerText": ""
        },
        {
          "id": "step-1791109340854",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/fbc71dfb-1397-4d3f-b583-900aa6d62bfe-butchery---lamb.webp",
          "title": "BUTCHERY - Lamb",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Lamb Chops\n•Lamb Neck Slices\n•Lamb Shoulder Roast\n•Lamb Tenderloin Medallions\n•Packed Ground Lamb\n•Packed Lamb Shank",
          "spoilerText": ""
        },
        {
          "id": "step-1791109520355",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/8b15d538-c9c6-4943-9ed4-b882495c8b54-butchery---wagyu.webp",
          "title": "BUTCHERY - Wagyu",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Wagyu Beef Shank Slice\n•Wagyu Bone-in Ribeye Steak\n•Wagyu Brisket Slice\n•Wagyu Chuck Steak\n•Wagyu Oxtail Slice\n•Wagyu Picanha Steak\n•Wagyu Plate Short Rib Portion\n•Wagyu Porterhouse Steak\n•Wagyu Ribeye Steak\n•Wagyu Strip Steak\n•Wagyu T-Bone Steak\n•Wagyu Tomahawk Steak",
          "spoilerText": ""
        },
        {
          "id": "step-1791109827254",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/832454ac-c319-470f-9534-d70ee4e19f5f-canned-goods.webp",
          "title": "CANNED GOODS",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Albacore Tuna\n•Canned Peas\n•Canned Red Peas\n•Canned Tuna\n•Large Canned Tuna\n•Small Canned Peas\n•Small Canned Tuna\n•Tuna",
          "spoilerText": ""
        },
        {
          "id": "step-1791110150622",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/c110adc0-b58b-4126-bffa-830aaef568ea-cereals.webp",
          "title": "CEREAL",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Cereal (Chokopik)\n•Cereal (Pirate)\n•Chocolate Granola\n•Honey Corn Cereal",
          "spoilerText": ""
        },
        {
          "id": "step-1791110262516",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/bc1a3245-09e3-4edc-b819-97e5ad570987-cleaning-supplies.webp",
          "title": "CLEANING SUPPLIES",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•All-Purpose Cleaner\n•Bathroom Cleaner\n•Bleach Cleaner\n•Bleach 1.5L\n•Bleach 4L\n•Cleaning Spray\n•Dishwasher Tablets (48 Tablets)\n•Dishwasher Tablets (60 Tablets)\n•Dishwasher Tablets (84 Tablets)\n•Dishwashing Liquid\n•Dishwashing Sponge\n•Dustpan\n•Eco Laundry Detergent\n•Laundry Detergent\n•Lemon Bleach 1.5L\n•Lemon Dishwashing Liquid\n•Multipurpose Cleaner\n•Ocean Fresh Bleach 1.5L\n•Orange Dishwashing Liquid\n•Rust & Limescale Remover\n•Soap Laundry Detergent\n•Sponge Pack\n•Squeegee\n•Toilet Cleaner",
          "spoilerText": ""
        },
        {
          "id": "step-1791111526450",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/a9adb834-a77a-4aa1-988e-c0fad2e55d65-coffee---tea.webp",
          "title": "COFFEE & TEA",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Black Tea Canister\n•Box of Tea\n•Ceylon Black Tea\n•Coffee\n•Coffee Beans\n•Dark Roast Coffee Beans\n•Earl Grey Tea\n•Green Tea Canister\n•Matcha Tea Tin\n•Medium Roast Coffee Beans\n•Rose Tea\n•White Tea Canister",
          "spoilerText": ""
        },
        {
          "id": "step-1791111872482",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/b613ee52-3454-4046-bc1c-8dd3cb66c97b-cooking---baking.webp",
          "title": "COOKING & BAKING",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•All-Purpose Flour\n•Black Pepper Grinder\n•Brown Sugar\n•Cane Sugar\n•Chocolate Powder\n•Flour (Green Village)\n•Flour (Master Flour)\n•Mashed Potato\n•Olive Oil\n•Organic Cane Sugar\n•Organic White Sugar\n•Powdered Sugar (Boully)\n•Powdered Sugar (Pablo)\n•Powdered Sugar (Susu)\n•Salt\n•Sea Salt\n•Sugar\n•Sunflower Oil\n•Unrefined Brown Sugar\n•Whole Wheat Flour",
          "spoilerText": ""
        },
        {
          "id": "step-1791112491095",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/53e3d8f3-1615-4685-97af-0af4b5ee76fd-fresh-produce---vegetables.webp",
          "title": "FRESH PRODUCE - Vegetable",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Acorn Squash\n•Artichoke\n•Avocado\n•Butternut Squash\n•Cabbage\n•Carrot\n•Cucumber\n•Garlic\n•Lettuce\n•Mushroom\n•Onion\n•Potato\n•Pumpkin\n•Tomato\n•Zucchini",
          "spoilerText": ""
        },
        {
          "id": "step-1791116967938",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/adcfa7ae-68fb-4cd6-b0bf-95d70a46933b-fresh-produce---fruits.webp",
          "title": "FRESH PRODUCE - Fruits",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Apple\n•Banana\n•Grapefruit\n•Kiwi\n•Lemon\n•Mandarin\n•Mango\n•Melon\n•Pear\n•Pineapple\n•Red Apple\n•Watermelon",
          "spoilerText": ""
        },
        {
          "id": "step-1791117265026",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/da75e672-8250-4eeb-b583-58e7de4605ce-frozen-fast-food-2.webp",
          "title": "FROZEN FAST FOOD",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Angus Beef Patties\n•Beef Cheddar\n•Beef Sliders\n•Bolognese Pizza\n•Cheese Burger\n•Chicken Nuggets\n•Deluxe Rising-Crust Pizza\n•Flame-Grilled Sliders\n•Four Cheese Pizza\n•Frozen Onion Rings\n•Ham & Mushroom Pizza\n•Italian Sausage Stromboli\n•Mediterranean Vegetable & Cheese Pizza\n•Microwave Cheeseburger\n•Mini Cheeseburger\n•Mozzarella & Pesto Pizza\n•Parmesan Ranch Pepperoni Pizza\n•Pepperoni Party Pizza\n•Raclette Pizza\n•Thin-Crust Sausage Pizza",
          "spoilerText": ""
        },
        {
          "id": "step-1791117965648",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/dca5ecf5-d499-4051-947e-b1806a337cc0-frozen-meat---seafood.webp",
          "title": "FROZEN MEAT & SEAFOOD",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•18-Pack Breaded Fish Fillets\n•Alaska Pollock Fillets\n•Beaf Steak\n•Breaded Fish Sticks\n•Breaded Hake Fillets\n•Chicken\n•Chicken Wings\n•Crispy Battered Fish Fillets\n•Crumbed Whiting Fillets\n•Cutlet\n•Frozen Whole Shrimp\n•Omega-3 Fish Fingers\n•Salmon Fillets\n•Sushi\n•Veal Chop",
          "spoilerText": ""
        },
        {
          "id": "step-1791118616273",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/3de808ae-1604-44ef-8240-c0a5fa23a3d0-frozen-ready-meals.webp",
          "title": "FROZEN READY MEALS",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Bolognese Lasagna\n•Breton Ham & Cheese Galettes\n•Cheese Phyllo\n•Fish & Chips Dinner\n•Gluten-Free Ham & Cheese Puff Patries\n•Ham & Cheese Galettes\n•Moussaka\n•Scallop, Leek & Potato Gratin\n•Seasoned Chicken Wings & Drummettes\n•Spinach & Cheese Phyllo",
          "spoilerText": ""
        },
        {
          "id": "step-1791119028368",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/83742e33-4fab-4503-8e97-34fa3428bd85-froze-veg---potatoes.webp",
          "title": "FROZEN VEG & POTATOES",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Boxed Frozen Peas\n•Crispy Potato Pops\n•Extra Thin Fries\n•Frozen Carrots\n•Frozen Garden Vegetable Mix\n•Frozen Green Bean & Mushroom Mix\n•Frozen Green Beans\n•Frozen Green Peas\n•Frozen Mixed Vegetables\n•Frozen Sweet Corn\n•Homestyle Chips\n•Large Frozen Green Beans\n•Straight-Cut Fries\n•Straight-Cut Oven Chips\n•Traditional Fries",
          "spoilerText": ""
        },
        {
          "id": "step-1791119746017",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/dc27a979-17bc-4f00-a99f-d45c91517da3-home-decoration.webp",
          "title": "HOME DECORATION",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Decorative Cookie Canister\n•Feather Wall Art\n•Large House Decoration\n•Medium Black Geometric Ceramic Vase\n•Medium Black & Wood Vase\n•Medium Bronze Vase\n•Medium Gold Bulb Vase\n•Medium House Decoration\n•Medium Silver Bulb Vase\n•Medium White Textured Ceramic Vase\n•Penguin Wall Art\n•Short Black Geometric Ceramic Vase\n•Short Bronze Vase\n•Short White Textured Ceramic Vase\n•Small Black & Wood Vase\n•Small Gold Bulb Vase\n•Small House Decoration\n•Small Silver Bulb vase\n•Tall Black Geometric Ceramic Vase\n•Tall Black & Wood Vase\n•Tall Bronze Vase\n•Tall Gold Bulb Vase\n•Tall Silver Bulb Vase\n•Tall White Textured Ceramic Vase",
          "spoilerText": ""
        },
        {
          "id": "step-1791121081878",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/d48a8093-f171-489d-abac-affbd159c419-ice-cream.webp",
          "title": "ICE CREAM",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Candy Coated Ice Cream Bars\n•Caramel Ice Cream Tub\n•Caramel Pizzelle Ice Cream Bars\n•Classic Ice Cream Collection\n•Coffee Ice Cream Tub\n•Ice Cream\n•Ice Cream Cones\n•Mini Caramel Double Chocolate Ice Cream\n•Orange Ice Cream Tub\n•Pink Strawberry Ice Cream Tub\n•Premium Caramel Ice Cream Tub\n•Rapsberry & Strawberry Ice Cream Cones\n•Stracciatella Ice Cream Tub\n•Strawberry Cheesecake Ice Cream Tub\n•Strawberry Ice Cream Tub\n•Strawberry Meringue Ice Cream Tub\n•Strawberry Swirl Ice Cream Tub\n•Toffee & Vodka Ice Cream Tub\n•Vanilla & Rapsberry Ice Cream Cones\n•Vanilla & Strawberry Ice Cream Cones",
          "spoilerText": ""
        },
        {
          "id": "step-1791166928855",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/160afab2-aef8-470a-ae4c-ca874e4a4411-paper-goods.webp",
          "title": "PAPER GOODS",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Floral Paper Towels\n•Soft White Paper Towels\n•Soft White Toilet Paper\n•Toilet Paper",
          "spoilerText": ""
        },
        {
          "id": "step-1791167112398",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/eb984022-1195-4d85-afdd-14f57d88a4c3-pasta.webp",
          "title": "PASTA",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Box Pasta\n•Elbow Pasta\n•Macaroni & Cheese\n•Noodles\n•Pasta\n•Penne Pasta\n•Spaghetti\n•Whole Grain Penne",
          "spoilerText": ""
        },
        {
          "id": "step-1791167345413",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/f1292478-38bf-4ab3-8ffe-dfeab1824b2c-personal-care.webp",
          "title": "PERSONAL CARE",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Argan Oil Shampoo\n•Avocado Shampoo\n•Baby Body & Hair Wash\n•Bubble Bath\n•Castor Oil & Maple Shampoo\n•Coconut Shampoo (blue)\n•Coconut Shampoo (orange)\n•Conditioning Shampoo\n•Curly Hair Shampoo\n•Gentle Shampoo\n•Hair Brush\n•Hand Soap\n•Honey & jojoba Shampoo\n•Hydrating Shampoo\n•Men's 3-in-1 Shower Gel\n•Men's Shampoo\n•Moisturizing Lotion\n•Regular Hold Hair Spray\n•Shampoo\n•Shaving Cream\n•Soap\n•Toothpaste\n•Ultra Hold Hair Spray\n•Wet Wipes",
          "spoilerText": ""
        },
        {
          "id": "step-1791168812203",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/06c3366f-9e08-443b-a6b2-57447ce63863-pet-supplies.webp",
          "title": "PET SUPPLIES",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Adult Dog Food\n•Beef Dog Food\n•Cat Food\n•Chicken & Veal Cat Food",
          "spoilerText": ""
        },
        {
          "id": "step-1791168936090",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/f7bb6740-903d-44a2-8095-17eda1f272af-refrigerated---beers.webp",
          "title": "REFRIGERATED - Beer",
          "video": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-videos/walkthrough-videos/d2b8fd55-7948-4dcf-97ac-eacb95c03c01-beer.optimized.webm",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•American Pale Ale\n•Blonde Beer\n•Czech Lager\n•IPA Beer\n•Maple-Aged Beer\n•Pilsner Beer\n•Premium Lager\n•Premium Pale Ale\n•Stout Beer\n•Trappist Beer",
          "spoilerText": "",
          "videoPoster": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-videos/walkthrough-posters/8fb6a976-3593-42e2-99f9-cc0ddc2fda6d-beer-poster.webp"
        },
        {
          "id": "step-1791169241996",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/350a545a-70db-4dee-9b2c-2a460961f6b4-refrigerated---cheese---deli.webp",
          "title": "REFRIGERATED - Cheese & Deli",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Comte Cheese\n•Grated Parmesan Cheese\n•Gruyere Cheese\n•Hard Cheese\n•Mimolette Cheese\n•Mozzarella Cheese\n•Parma Ham\n•Parmigiano Reggiano Cheese\n•Salami\n•Sliced Ham",
          "spoilerText": ""
        },
        {
          "id": "step-1791169532884",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/9d392d58-37f7-4054-ad83-a1b4b5da5998-refrigerated---cold-drinks.webp",
          "title": "REFRIGERATED - Cold Drinks",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Apple & Red Berry Soda \n•Black Cola\n•Bottled Soda\n•Cherry Cola\n•Cola\n•Cola (can)\n•Grapefruit-ling Soda\n•Juice\n•Lemon-Lime Soda\n•Lemon-Lime Soda (can)\n•Natural Mineral Water\n•Orange Soda\n•Orange Soda (can)\n•Purified Drinking Water\n•Soda\n•Water 1.5L\n•Zero-Sugar Cola\n•Zero-Sugar Grape Soda\n•Zero-Sugar Orange Soda\n•Zero-Sugar Peach Soda",
          "spoilerText": ""
        },
        {
          "id": "step-1791170686560",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/d77ed8ec-9558-4f9d-a019-8d9abb6b704d-refrigerated---dairy---eggs.webp",
          "title": "REFRIGERATED - Dairy & Eggs",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Butter\n•Creme Fraiche\n•Egg\n•Fruit Yogurt\n•Light Yogurt\n•Milk\n•Milk Bottle Six-Pack\n•Plain Yogurt\n•Pudding\n•Whipped Cream",
          "spoilerText": ""
        },
        {
          "id": "step-1791171081651",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/29159fb5-bcf3-4dae-9267-ce0e8c804299-rice.webp",
          "title": "RICE",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Basmati Rice\n•Long-Grain Rice\n•Rice\n•White Rice",
          "spoilerText": ""
        },
        {
          "id": "step-1791171184794",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/b75a168d-2473-446e-a7a0-6b286706759d-sauces.webp",
          "title": "SAUCES",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Mayonnaise\n•Mayonnaise (jar)\n•Mustard\n•Organic Ketchup",
          "spoilerText": ""
        },
        {
          "id": "step-1791171280785",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/0650736d-8f6c-4a92-b25a-5adb4c019916-seafood---fish-cuts---oysters.webp",
          "title": "SEAFOOD - Fish Cuts & Oysters",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Black Oyster\n•Herring Fillet\n•King Salmon Fillet\n•Red Snapper Fillet\n•Salmon Slice\n•Trout Fillet\n•Tuna Steak\n•White Oyster",
          "spoilerText": ""
        },
        {
          "id": "step-1791171908646",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/25f7d749-4fe6-438a-94f7-61e31c80bbc3-seafood---fresh-fish.webp",
          "title": "SEAFOOD - Fresh Fish",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Cleaned Carp\n•Cleaned Cod\n•Cleaned Sea Bass\n•Cleaned Sea Bream\n•Cleaned Trout\n•Herring\n•King Salmon\n•Mackerel\n•Perch\n•Red Snapper\n•Red Tilapia\n•Sardine\n•Sea Bass\n•Sea Bream\n•Small Mackerel\n•Trout",
          "spoilerText": ""
        },
        {
          "id": "step-1791172378062",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/d4e5fa7f-1163-4e54-9c5f-6dc4edfb35df-snacks.webp",
          "title": "SNACKS",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Box of Chocolates\n•Brazil Nuts\n•Cake\n•Candy Bar\n•Cheese Puffs\n•Chocolate Chips Madeleines\n•Chocolate Marble Cake (27)\n•Chocolate Marble Cake (30)\n•Classic Marble Cake\n•Cookie\n•Cookie Butter\n•Cookies & Cream Chocolate Bar\n•Creamy Bun\n•Crispy Chips\n•Crunchy Chocolate Bar\n•Dark Chocolate Bar\n•Fruit Gummies\n•Jelly Beans\n•Milk Chocolate Bites\n•Nacho Cheese Tortilla Chips\n•Peeled Peanuts\n•Salt Crackers\n•Strawberry Candy Bag\n•Sugar-Free Lemon Cakes",
          "spoilerText": ""
        },
        {
          "id": "step-1791176130276",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/3c872f5a-61d8-4024-8142-a5dd6a4cc54c-spreads.webp",
          "title": "SPREADS",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Hazelnut Chocolate Spread\n•Peanut Butter\n•Peanut Butter (orange jar)\n•Pure Honey",
          "spoilerText": ""
        },
        {
          "id": "step-1791176229162",
          "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/d7a0015c-c22d-4236-8d5a-47787e4e7ce4-wine---spirits-2.webp",
          "title": "WINE & SPIRITS",
          "imageAlt": "Step illustration",
          "hasSpoiler": false,
          "description": "•Aged Scotch Whiskey\n•American Whiskey\n•Black Lager Six-Pack\n•Blonde Beer Keg\n•Blonde Beer Six-Pack\n•Bourbon Whiskey\n•Brandy Liqueur\n•Buttafuoco Wine\n•Champagne\n•Cherry Liqueur\n•Classic Lager Keg\n•Classic Lager Six-Pack\n•Cognac\n•Cognac Orange Liqueur\n•Dry Gin\n•Italian Red Blend\n•Japanese Single Malt Whiskey\n•Montevero Red Wine\n•Peach Schnapps\n•Piedmont Red Wine\n•Premium Lager Keg\n•Premium Vodka\n•Red Wine\n•Rose Wine\n•Rum Liqueur\n•Rye Whiskey\n•Tangerine Liqueur\n•Tennessee Whiskey",
          "spoilerText": ""
        }
      ],
      "title": "Supermarket"
    },
    {
      "id": "section-1791179193627",
      "steps": [],
      "title": "The Megastore (Coming Soon)"
    }
  ]
}
];
