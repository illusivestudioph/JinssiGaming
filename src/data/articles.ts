export interface ArticleSection {
  heading?: string;
  content: string[]; // array of paragraphs
  image?: string;
  imageAlt?: string;
  callout?: {
    title: string;
    text: string;
  };
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  authorRole: string;
  date: string;
  readTimeMinutes: number;
  category: 'Curated List' | 'Review' | 'Guide' | 'Cozy Essay';
  tags: string[];
  cozyScore: number; // 1 to 5
  stressLevel: 'Zero Stress' | 'Very Low' | 'Gentle Challenge';
  coverImage: string;
  coverAlt: string;
  summary: string;
  sections: ArticleSection[];
  relatedGameId?: string;
}

export const articleCategories = [
  'All',
  'Curated List',
  'Review',
  'Guide',
  'Cozy Essay',
] as const;

export const articles: Article[] = [
  {
    id: 'organizing-games-steam',
    slug: '7-relaxing-cozy-organizing-games-steam',
    title: 'The 7 Most Relaxing Cozy Organizing Games on Steam (Zero Stress)',
    subtitle: 'From sorting magical archives to packing bento boxes, here are the most peaceful organizing games to play with a warm cup of tea.',
    author: 'Jinssi Editorial',
    authorRole: 'Cozy Gaming Curator',
    date: 'Sep 9, 2026',
    readTimeMinutes: 6,
    category: 'Curated List',
    tags: ['Organizing', 'Steam', 'Relaxing', 'Indie Games', 'Recommendations'],
    cozyScore: 5,
    stressLevel: 'Zero Stress',
    coverImage: 'https://images.pexels.com/photos/12593769/pexels-photo-12593769.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    coverAlt: 'A cozy wooden bookshelf with arranged books and a warm desk lamp.',
    summary: 'Discover seven deeply satisfying games where your only job is to bring gentle order out of chaotic clutter at your own pace.',
    relatedGameId: 'librarian',
    sections: [
      {
        heading: 'Why Our Brains Crave Gentle Order',
        content: [
          'There is a quiet, meditative joy in taking something cluttered and gently turning it into neat rows. In a world full of chaotic to-do lists, unpredictable news, and demanding schedules, organizing games offer a rare sanctuary: an enclosed little sandbox where every problem has an elegant solution, and nothing bad will happen if you take your sweet time.',
          'Unlike fast-paced strategy or competitive games that spike your adrenaline, organizing games stimulate your brain’s dopamine system through soft spatial satisfaction. Here are seven hand-picked titles that deliver that exact soothing sensation.',
        ],
        callout: {
          title: 'Cozy Tip for Play Sessions',
          text: 'Pair these games with lo-fi instrumental music or soft rainfall sounds in our ambient sound mixer for the ultimate calming evening.',
        },
      },
      {
        heading: '1. A Little to the Left',
        content: [
          'Developed by Max Inferno, A Little to the Left is a masterclass in domestic satisfaction. You are presented with everyday items—receipts, colored pencils, measuring spoons, and soup cans—and tasked with arranging them into harmonious patterns.',
          'What makes it truly special is that many puzzles have multiple valid solutions: you might sort by color, height, pattern, or thickness. Just beware of the mischievous house cat whose white paw periodically reaches out from the edge of your screen to swat your neatly stacked stamps into disarray.',
        ],
        image: 'https://images.pexels.com/photos/7703306/pexels-photo-7703306.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Neat stationery arranged carefully on a wooden table.',
      },
      {
        heading: '2. Unpacking',
        content: [
          'Witch Beam’s breakout hit turns the physically exhausting chore of moving house into an emotional, wordless narrative journey. Over the course of eight moves between 1997 and 2018, you unpack cardboard boxes and decide where to place toothbrushes, video game consoles, stuffed animals, and framed photos.',
          'Through the objects you unpack, you piece together the character’s life: childhood hobbies, difficult relationships, and eventually finding a partner who makes room on their shelves for her beloved stuffed chicken.',
        ],
      },
      {
        heading: '3. Sticky Business',
        content: [
          'If you have ever dreamt of running a tiny stationery shop without any real-world financial stress, Sticky Business is pure comfort. You design custom stickers using cute graphic elements, pack orders in decorated boxes, and read heartfelt thank-you notes from your regular customers.',
          'The tactile sound of peeling and sticking paper stickers combined with pastel color palettes makes this one of the most gentle indie gems released in recent years.',
        ],
        callout: {
          title: 'Vibe Check',
          text: 'Perfect for playing when you want to feel productive without any chance of losing or running out of time.',
        },
      },
      {
        heading: '4. Assemble with Care',
        content: [
          'From Ustwo Games (the creators of Monument Valley), this story-driven puzzle game follows Maria, an antique restorer who arrives in the sun-soaked town of Bellariva. Residents bring her their broken heirlooms: vintage cassette players, cameras, neon clocks, and music boxes.',
          'You unscrew tiny faceplates, replace worn gears, resolder audio wires, and reassemble each item with satisfying clicks and snaps. It is deeply tactile and touching.',
        ],
        image: 'https://images.pexels.com/photos/4107106/pexels-photo-4107106.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Vintage electronics and camera components being restored on a clean workspace.',
      },
      {
        heading: '5. Wilmot’s Warehouse',
        content: [
          'Wilmot’s Warehouse takes the concept of warehouse management and turns it into a playful memory test. You push square crates representing hundreds of abstract goods—like guitars, hats, umbrellas, and diamonds—into whatever organizational system makes sense to your brain.',
          'Between delivery rounds, you get unlimited B-side time to wander around, reorganize your aisles, and admire your inventory.',
        ],
      },
      {
        heading: '6. Inbento',
        content: [
          'Inbento is a mouth-watering puzzle game about a mother cat preparing bento lunchboxes for her kitten. You slide, flip, and swap rice balls, salmon slices, and avocado rolls to match a recipe card.',
          'With hand-drawn illustrations and zero text, it delivers a heartwarming story about growing up and the comfort of homemade food.',
        ],
      },
      {
        heading: '7. Librarian: Tidy Up the Arcane Library',
        content: [
          'Our very own featured cozy puzzle journey! In Librarian, you step into ancient magical halls where books whisper, enchanted shelves demand dusting, and stray scrolls need sorting by their magical auras.',
          'Check out our complete step-by-step walkthrough right here on JinssiGaming to discover every secret achievement and color-coded sorting trick.',
        ],
      },
    ],
  },
  {
    id: 'tiny-glade-review',
    slug: 'tiny-glade-peaceful-castle-builder-cozy-review',
    title: 'Tiny Glade: Why This Peaceful Castle Builder is the Ultimate Cozy Game',
    subtitle: 'No grid, no timers, no resource management, and no failure state—just stone walls, blooming ivy, and roaming sheep.',
    author: 'Jinssi Editorial',
    authorRole: 'Indie Game Reviewer',
    date: 'Sep 8, 2026',
    readTimeMinutes: 5,
    category: 'Review',
    tags: ['Tiny Glade', 'Castle Builder', 'Indie Review', 'Peaceful', 'Steam'],
    cozyScore: 5,
    stressLevel: 'Zero Stress',
    coverImage: 'https://images.pexels.com/photos/16433564/pexels-photo-16433564.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    coverAlt: 'A peaceful moss-covered stone cottage with ivy vines and wildflowers.',
    summary: 'Pounce Light’s Tiny Glade removes the stress of city builders and replaces it with pure architectural doodling in a sun-drenched meadow.',
    sections: [
      {
        heading: 'A Builder Free From Deadlines and Taxes',
        content: [
          'City builders and architectural games have long been staples of PC gaming, but almost all of them arrive wrapped in stress. You have to balance budgets, ensure your peasants have enough grain, manage traffic congestion, and prepare for invading armies.',
          'Tiny Glade throws every single one of those demands out the window. There are no currencies, no levels, no grid constraints, and no objectives. The game drops you into a gentle, sunlit meadow filled with fluffy sheep and birds, gives you a handful of intuitive brushes, and invites you to play.',
        ],
      },
      {
        heading: 'The Magic of Procedural Charm',
        content: [
          'What makes Tiny Glade feel alive is how the game’s procedural engine responds to your every stroke. If you drag a stone wall across a dirt path, an arched doorway automatically carves itself into the brick.',
          'Push a tower against a cottage roof, and wooden scaffolding appears. Drag a window lower, and wooden shutters swing open with flower boxes blossoming underneath. Lower the terrain near a wall, and a crystal-clear pond forms with swimming ducks.',
        ],
        callout: {
          title: 'Hidden Delight',
          text: 'You can click on the roaming sheep to pet them. Their ears wiggle and little floating hearts appear!',
        },
      },
      {
        heading: 'Soundscape and Lighting',
        content: [
          'The audio design deserves special mention. Every brick placed makes a soft, tactile thud. You hear the breeze whistling through autumn birch trees, crickets chirping as the sun dips below the horizon, and gentle acoustic guitar melodies that never overpower your thoughts.',
          'The built-in photo mode lets you adjust time of day, fog depth, and camera angles, making it a dream for creating custom desktop wallpapers or cozy moodboards.',
        ],
        image: 'https://images.pexels.com/photos/29765221/pexels-photo-29765221.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Sunlit rustic countryside meadow with stone walls.',
      },
      {
        heading: 'The Verdict',
        content: [
          'Tiny Glade is less of a traditional game and more of a digital zen garden. Whether you spend ten minutes constructing a mossy ruins archway or two hours crafting a fairy-tale citadel, you leave feeling lighter than when you opened it.',
          'Final Score: 5/5 Teacups 🍵. An absolute must-play for anyone seeking respite from the noise of the modern world.',
        ],
      },
    ],
  },
  {
    id: 'unpacking-hidden-story',
    slug: 'unpacking-hidden-story-behind-every-room',
    title: 'Unpacking: The Hidden Story Behind Every Room (And Secret Achievements)',
    subtitle: 'How a quiet puzzle game about cardboard boxes tells one of the most poignant coming-of-age stories in modern gaming.',
    author: 'Jinssi Editorial',
    authorRole: 'Narrative Analyst',
    date: 'Sep 7, 2026',
    readTimeMinutes: 7,
    category: 'Guide',
    tags: ['Unpacking', 'Game Guide', 'Narrative', 'Secrets', 'Walkthrough'],
    cozyScore: 5,
    stressLevel: 'Zero Stress',
    coverImage: 'https://images.pexels.com/photos/4440614/pexels-photo-4440614.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    coverAlt: 'A cozy bright bedroom with packed boxes and organized bookshelves.',
    summary: 'An exploration of the subtle environmental storytelling in Unpacking, along with a complete checklist for unlocking all secret stickers.',
    sections: [
      {
        heading: 'Storytelling Without a Single Spoken Word',
        content: [
          'When you first boot up Unpacking, it appears to be a straightforward spatial puzzle: take items out of moving boxes and put them away in rooms. But as you progress across 21 years of the protagonist’s life, you realize the game is doing something extraordinary.',
          'Without dialogue, cutscenes, or visible human characters, Unpacking tells an intimate story purely through objects. What someone packs, what they discard, and where their possessions are allowed to live reveals everything about their mental state, relationships, and identity.',
        ],
      },
      {
        heading: 'The Heartbreak of the 2010 Apartment',
        content: [
          'The emotional climax of the game occurs in 2010 when the protagonist moves into her boyfriend’s sleek, ultra-modern bachelor pad. The apartment is already fully decorated with his awards, guitars, and minimalist furniture.',
          'As you unpack her belongings, you discover there is almost no room for her. Her art supplies have to be crammed under the bed. Her favorite posters have no wall space. And most tellingly: when you unpack her hard-earned university diploma, the game refuses to let you hang it anywhere on the walls.',
          'The only valid place the game permits you to put her degree is tucked away inside a closet under her socks. In a single gameplay mechanic, Witch Beam communicates the quiet suffocation of being in a relationship where someone won’t make room for who you are.',
        ],
        callout: {
          title: 'Environmental Detail to Notice',
          text: 'Notice how the boyfriend’s coffee mug sits on a coaster, while her colorful childhood mug is relegated to the back of the highest kitchen shelf.',
        },
      },
      {
        heading: 'Secret Stickers & Achievement Checklist',
        content: [
          'Want to earn 100% completion? Here are the most easily missed secret achievements across the stages:',
          '• Solve a Puzzle (1997): Pick up the Rubik’s cube in the childhood bedroom and click it repeatedly until all colors align.',
          '• Make Some Noise (2004): Click the radio in the dorm room to turn on music.',
          '• Blast Your Tunes (2007): Place the MP3 player next to the computer speakers.',
          '• Strike a Pose (2012): In the parents’ house after the breakup, position the wooden mannequin into a dancing pose.',
          '• Baby on Board (2018): In the final master bedroom, place the yellow rubber duck on the baby bathtub.',
        ],
      },
      {
        heading: 'The Warmth of Moving Forward',
        content: [
          'By 2018, when she finally buys a home with a loving partner, their belongings blend seamlessly. The diploma hangs proudly in her home office, her childhood pig stuffed animal sits side-by-side with her partner’s tiger plushie, and every room radiates safety and belonging.',
          'Unpacking reminds us that our physical spaces are reflections of our inner peace—and that finding people who celebrate our quirks is the greatest homecoming of all.',
        ],
      },
    ],
  },
  {
    id: 'healing-from-burnout',
    slug: 'how-cozy-games-are-quietly-healing-us-from-burnout',
    title: 'How Cozy Games Are Quietly Healing Us From Modern Burnout',
    subtitle: 'In a culture demanding endless productivity, cozy gaming offers a radical permission to slow down, arrange teacups, and just breathe.',
    author: 'Jinssi Editorial',
    authorRole: 'Culture & Wellness',
    date: 'Sep 6, 2026',
    readTimeMinutes: 5,
    category: 'Cozy Essay',
    tags: ['Mental Health', 'Cozy Gaming', 'Burnout', 'Wellness', 'Culture'],
    cozyScore: 5,
    stressLevel: 'Zero Stress',
    coverImage: 'https://images.pexels.com/photos/12593769/pexels-photo-12593769.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    coverAlt: 'A cup of tea next to an open notebook and warm ambient candlelight.',
    summary: 'An exploration into the psychological phenomenon of cozy gaming, low-stakes play, and why peaceful digital spaces are essential for modern wellness.',
    sections: [
      {
        heading: 'The Tyranny of the Modern Hustle',
        content: [
          'We live in an era where even leisure is expected to be optimized. Podcasts are played at 1.5x speed. Weekends are packed with side hustles. Fitness trackers demand 10,000 steps, and social feeds broadcast curated achievements around the clock.',
          'For years, mainstream video games mirrored this intensity: battle passes with FOMO expiration dates, hyper-competitive multiplayer rankings, and 100-hour open worlds bristling with stressful checklists. Instead of unwinding, players were clocking into a second job.',
        ],
      },
      {
        heading: 'The Rise of "Low-Stakes" Play',
        content: [
          'Then came the explosion of cozy gaming. Titles like Stardew Valley, Animal Crossing: New Horizons, Spiritfarer, and Coffee Talk proved that players were starving for gentleness.',
          'Psychologists refer to this as "low-stakes play"—an activity where failure carries no permanent penalty, time moves at a benevolent pace, and the player is granted full agency over their world. In a cozy game, if your turnip crop takes an extra day to harvest, nobody yells at you. If you spend three hours arranging potted ferns on a balcony in Tiny Glade, the game celebrates your curiosity.',
        ],
        callout: {
          title: 'The "Tea & Controller" Ritual',
          text: 'Many players report that establishing an evening ritual—brewing herbal tea, dimming the lights, and playing 30 minutes of a low-stakes game—significantly reduces insomnia and evening anxiety.',
        },
      },
      {
        heading: 'Reclaiming the Right to Rest',
        content: [
          'Cozy games do not demand that you become the chosen savior of the universe. You do not have to defeat an elder god or shoot down enemy squads. Often, your purpose is simply to bake bread for village neighbors, restore an enchanted library, or help a weary traveler find a seat by the fire.',
          'In doing so, these gentle titles quietly heal us. They remind us that our worth is not measured by relentless output, and that there is profound beauty in simply existing, resting, and enjoying the quiet moments.',
        ],
      },
    ],
  },
];
