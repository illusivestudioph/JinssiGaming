export interface WalkthroughStep {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  hasSpoiler?: boolean;
  spoilerText?: string;
}

export interface WalkthroughSection {
  id: string;
  title: string;
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
  coverAlt: string;
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
            "id": "step-1789684417684",
            "image": "https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/d8d9732b-fc2a-488f-8e9d-7288b228c04f-1---action-movies.webp",
            "title": "ACTION MOVIES",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "•Assassins and Companions\n•Cowboy Westwood\n•Gladiator Maximus\n•Gold, Bold, and Uncle\n•Green Beret Veteran: Kill\n•Green Beret Veteran: Survive\n•Guardians of the Ocean\n•Hell Weapon I\n•Hell Weapon II\n•Hell Weapon III\n•Outlaw Westwood\n•Thieves of the Land\n•Utopia Priests I\n•Utopia Priests II\n•Utopia Priests III",
            "spoilerText": ""
          },
          {
            "id": "step-1789685215451",
            "image": "",
            "title": "DRAMA MOVIES",
            "imageAlt": "Step illustration",
            "hasSpoiler": false,
            "description": "•",
            "spoilerText": ""
          }
        ]
      }
    ]
  }
];

