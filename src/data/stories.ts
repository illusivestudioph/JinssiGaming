export interface StoryChapter {
  id: string;
  chapterNumber: number;
  title: string;
  wordCount: number;
  readTimeMinutes: number;
  content: string[]; // array of paragraphs
  authorNote?: string;
  publishedDate: string;
}

export interface Story {
  id: string;
  slug: string;
  title: string;
  synopsis: string;
  author: string;
  authorRole: string;
  coverImage: string;
  coverAlt: string;
  status: 'Ongoing' | 'Completed';
  genre: 'Slice of Life' | 'Gaming Lore' | 'Cozy Fantasy' | 'Mystery';
  tags: string[];
  totalChapters: number;
  chapters: StoryChapter[];
  rating: number; // 1 to 5 teacups
  readsCount?: number;
}

export const storyGenres = [
  'All',
  'Slice of Life',
  'Gaming Lore',
  'Cozy Fantasy',
  'Mystery',
] as const;

export const stories: Story[] = [
  {
    id: 'midnight-barista',
    slug: 'the-midnight-barista-of-rain-city',
    title: 'The Midnight Barista of Rain City',
    synopsis: 'In a perpetual rainy metropolis where neon reflections dance across wet pavement, a hidden alley café opens strictly between midnight and sunrise, serving customized warm drinks that unlock the unspoken secrets of wandering souls.',
    author: 'Jinssi',
    authorRole: 'Fiction Writer & Barista',
    coverImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/894090/ss_5f9606f8aa9e6cb015d73a2394a37ea90b4f5946.1920x1080.jpg',
    coverAlt: 'Steam rising from a warm ceramic mug in a cozy midnight coffee shop while rain taps against the glass.',
    status: 'Ongoing',
    genre: 'Slice of Life',
    tags: ['Coffee Talk', 'Rain', 'Midnight', 'Cozy Mystery', 'Comfort'],
    totalChapters: 3,
    rating: 5,
    readsCount: 1420,
    chapters: [
      {
        id: 'ch1',
        chapterNumber: 1,
        title: 'A Cup for the Rain Walker',
        wordCount: 820,
        readTimeMinutes: 4,
        publishedDate: 'Sep 7, 2026',
        authorNote: 'Welcome to Rain City! Best read with a warm cup of Earl Grey or chamomile tea.',
        content: [
          'The brass bell above the oak door chimed exactly at 12:04 AM. In Rain City, rain was not weather—it was an architecture. It fell in patient, diagonal sheets, drumming steady rhythms against the green canvas awning of The Steaming Kettle.',
          'I wiped down the copper countertop with a dry linen towel. The grinder hummed its low, comforting baritone as I weighed sixteen grams of dark roast beans from the northern highland slopes. A solitary figure stood in the entryway, water cascading off the brim of a dark trench coat onto the welcome mat.',
          '"We are open," I said softly, not looking up from the scale. "Though the peppermint tea is currently steeping, so you have two minutes to choose your seat."',
          'The customer chuckled—a dry, raspy sound that carried the fatigue of someone who had walked across three districts without an umbrella. He chose stool number four, right beside the antique brass espresso machine where the radiator hissed like a purring cat.',
          '"Do you serve anything that can make a person forget yesterday?" he asked, unwinding a sodden wool scarf from his collar.',
          '"Forgetting is outside my beverage license," I smiled, setting down a ceramic saucer. "But I can brew something that makes tomorrow feel considerably less daunting. Cinnamon, clove, steamed oat milk, and a double shot of espresso. We call it The Nightcap."',
          'He watched my hands move. There is an unspoken intimacy in watching someone prepare a drink just for you. The sound of milk frothing, the rich aroma of toasted hazelnuts blooming into the chilly room, the delicate pour that formed a tiny leaf on the crema surface.',
          'When he took his first sip, his shoulders—clenched tight against the midnight frost—dropped an entire inch. He closed his eyes. Outside, thunder rumbled softly across the bay, but inside, the only sound was the radiator and the ticking of an old grandfather clock. He sighed: "You know, barista... I think I needed this more than I realized."',
        ],
      },
      {
        id: 'ch2',
        chapterNumber: 2,
        title: 'Steam on the Windowpane',
        wordCount: 940,
        readTimeMinutes: 5,
        publishedDate: 'Sep 8, 2026',
        authorNote: 'Chapter 2 introduces Maya, our neighborhood illustrator. What is your go-to late-night study beverage?',
        content: [
          'By 1:30 AM, the condensation on the front window was thick enough to write letters in. Outside, the headlights of an electric tram swept past, casting amber beams across our wood-paneled walls.',
          'At table two in the corner sat Maya. She was a regular whose sketchbook was as battered as an old library book. A half-melted candle in a vintage saucer flickered between her pencils and eraser shavings.',
          '"How is the children\'s book deadline coming?" I asked, carrying over a fresh mug of ginger honey tea.',
          'She groaned, burying her face in her oversized knitted sleeves. "The dragon looks like an angry cucumber. I’ve erased his wings so many times the paper is practically transparent."',
          'I placed the mug beside her hand. "Ginger will warm your fingers. And remember: children do not care if a dragon looks like an angry cucumber, so long as he is a kind cucumber."',
          'She peeked out from one sleeve, eyed the swirling steam, and burst into soft laughter. "You have the strangest metaphors, Jinssi."',
          '"Metaphors are free with every beverage order," I said. "Now drink. The rain is picking up, and the night is young."',
          'She wrapped both palms around the warm ceramic, inhaling the spicy sweetness of fresh ginger. Sometimes, focus isn’t about pushing harder; it’s about giving yourself permission to pause and let the mental knot untangle on its own time.',
        ],
      },
      {
        id: 'ch3',
        chapterNumber: 3,
        title: 'The Whispering Tea Leaves',
        wordCount: 890,
        readTimeMinutes: 4,
        publishedDate: 'Sep 9, 2026',
        authorNote: 'The final installment of our opening arc. Look closely at the tea tin on the top shelf!',
        content: [
          'At 3:15 AM, the city fell into that deep, breathless silence that only exists between midnight and dawn. Even the rain had softened into a gentle whisper, pattering against the skylight like rice falling on silk.',
          'The door bell gave a polite ping. An elderly woman stepped inside, holding a small woven basket covered with checkered cloth. It was Madame Sylvie, who lived three floors above the clockmaker\'s shop on Fourth Avenue.',
          '"Still awake, Madame?" I greeted her with a nod, already reaching for the lavender blossoms.',
          '"At my age, dear, sleep is a negotiation," she smiled, placing her basket on the counter. "I brought you warm rosemary scones. Straight from the oven. The dough rose so nicely tonight I couldn\'t bear to let them cool alone."',
          'The fragrance of warm butter, flour, and fresh herbs immediately filled the café, cutting through the damp chill of the night. I exchanged two warm scones for a pot of lavender and chamomile infusion.',
          'We sat across from each other in the quiet room. In a world rushing toward tomorrow, The Steaming Kettle existed in the peaceful parenthesis of now. As Madame Sylvie stirred honey into her cup, the tea leaves settled into a gentle spiral at the bottom—a quiet reminder that every storm eventually runs out of rain.',
        ],
      },
    ],
  },
  {
    id: 'pelican-town-diary',
    slug: 'letters-from-pelican-town-a-stardew-diary',
    title: 'Letters from Pelican Town: A Stardew Diary',
    synopsis: 'Leaving behind a sterile corporate cubicle in Zuzu City, an exhausted architect arrives in Pelican Town to claim their grandfather’s overgrown farm. A serial cozy novel about blisters, parsnips, community center secrets, and finding peace in the dirt.',
    author: 'Jinssi',
    authorRole: 'Storyteller',
    coverImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/413150/ss_0d03bf1bc3e1f0e47854e4277b0687a414966d92.1920x1080.jpg',
    coverAlt: 'A cozy wooden farmhouse in Pelican Town surrounded by golden wheat fields, fruit trees, and a wooden fence at sunset.',
    status: 'Ongoing',
    genre: 'Gaming Lore',
    tags: ['Stardew Valley', 'Farming', 'Slice of Life', 'Comfort', 'Romance'],
    totalChapters: 3,
    rating: 5,
    readsCount: 2180,
    chapters: [
      {
        id: 'pt-ch1',
        chapterNumber: 1,
        title: 'The Overgrown Porch',
        wordCount: 880,
        readTimeMinutes: 4,
        publishedDate: 'Sep 6, 2026',
        authorNote: 'Dedicated to everyone who ever opened their grandfather’s envelope on a stressful workday.',
        content: [
          'The bus sputtered and came to a wheezing halt at the edge of the valley. When the hydraulic doors hissed open, the first thing that hit me was not the scent of smog or exhaust, but the overwhelming perfume of wet pine needles and wild honeysuckle.',
          'My dress shoes sank an inch into the muddy gravel. In my right hand was a single leather suitcase containing three flannel shirts, a pair of rugged denim jeans I had never worn, and a rusted brass key tied to a yellowed envelope.',
          'Mayor Lewis and Robin the carpenter were waiting by the wooden sign that read: *Welcome to Pelican Town: Population 34*.',
          '"Here she is!" Lewis boomed, adjusting his suspenders with a friendly grin. "Your grandfather spoke of you often before he passed. He said you had his eyes, though I suspect you haven\'t held a spade in twenty years."',
          '"Not since seventh grade biology," I admitted, looking down at hands that only knew mechanical keyboards and spreadsheet shortcuts.',
          'We walked up the winding dirt path toward Meadowbrook Farm. When we turned the final bend, my breath caught in my throat. The cottage was smaller than I remembered, but sturdy—weathered cedar shingles, a stone chimney, and a sprawling wooden porch covered in creeping ivy. Surrounding it was half an acre of wild weeds, scattered branches, and dandelion blossoms swaying in the afternoon breeze.',
          '"It’s a bit of a fixer-upper," Robin said gently, tapping a hammer against her tool belt. "But the bones are solid. The roof doesn\'t leak, and the fireplace draws like a dream."',
          'That night, after sweeping forty years of dust from the floorboards and lighting the hearth, I opened the packet of parsnip seeds Lewis had left on the kitchen table. Tomorrow, the work would begin. But for the first time in ten years, I fell asleep without setting an alarm clock.',
        ],
      },
      {
        id: 'pt-ch2',
        chapterNumber: 2,
        title: 'Blisters and Blackberry Briars',
        wordCount: 920,
        readTimeMinutes: 5,
        publishedDate: 'Sep 7, 2026',
        authorNote: 'How many times have you cleared that same plot of weeds in your own save file?',
        content: [
          'Day three began at 6:00 AM with the crowing of a rooster three farms over. Every muscle between my neck and my ankles ached with a deep, throbbing soreness that no ergonomic office chair could ever inflict.',
          'I pulled on thick canvas gloves and pushed open the front door. The morning mist was still clinging to the valley floor like spun sugar, glowing soft gold as the sun crested the eastern ridges.',
          'Armed with Grandpa’s scythe, I began clearing a ten-by-ten patch of dirt near the water well. The rhythmic *swish-swish* of steel cutting through wild grass became a hypnotic cadence. Unlike drafting corporate architectural blueprints that took six months to approve, farming offered immediate, tactile honesty: you clear a weed, and the ground is clean. You till a furrow, and the dark earth yields.',
          'By noon, sweat stung my eyes, and my palms sported three glorious blisters. But fifteen small mounds of tilled earth were neatly lined up in two parallel rows, each cradling a single parsnip seed.',
          'I filled the copper watering can at the pond, admiring the water striders skimming across the surface. Gently tipping the spout, I watched the dry soil darken into rich chocolate brown as it soaked up the water. A gentle breeze rustled through the oak trees overhead. I leaned on my hoe, wiped my forehead, and smiled.',
        ],
      },
      {
        id: 'pt-ch3',
        chapterNumber: 3,
        title: 'Meeting the Town and The Old Community Center',
        wordCount: 960,
        readTimeMinutes: 5,
        publishedDate: 'Sep 8, 2026',
        authorNote: 'The mysterious Junimos are waiting. Enjoy Chapter 3!',
        content: [
          'By Friday, the parsnip sprouts were three inches high, their bright green shoots standing proud against the dark loam. Lewis invited me on a walking tour of the town square to meet the villagers.',
          'At Pierre’s general store, I bought five packets of potato seeds while Pierre boasted about his fresh organic fertilizer. Next door at the clinic, Dr. Harvey handed me a pamphlet on sun protection and hydration with an earnest, nervous smile.',
          'Later, as the sun dipped behind the mountain, Lewis took me past an overgrown iron gate to a grand, dilapidated stone building with arched windows and a caved-in roof. The wooden plaque beside the door read: *Pelican Town Community Center*.',
          '"A shame, isn’t it?" Lewis sighed, his voice laden with nostalgia. "This used to be the heart of the town. Potlucks, dance festivals, winter banquets... but when the young folks started shopping at the JojaMart warehouse down by the river, it fell into disrepair."',
          'As Lewis walked back toward the road, a flicker of lime-green light caught my eye inside the shadowy hallway. A tiny round creature, no bigger than an apple, peeked around a crumbling pillar. It had two leafy antennas, black bead eyes, and tiny stick legs.',
          'It held up a glowing scroll of parchment, squeaked softly like a chirping cricket, and vanished into a shower of stardust. My heart fluttered with childlike wonder. There was magic buried in this valley—and somehow, I knew Grandpa had brought me here to help awaken it.',
        ],
      },
    ],
  },
  {
    id: 'alchemists-greenhouse',
    slug: 'the-alchemists-lost-greenhouse',
    title: 'The Alchemist’s Lost Greenhouse',
    synopsis: 'Hidden inside an alpine valley shrouded in year-round fog stands an ancient Victorian glass conservatory. When an exhausted botany apprentice inherits the keys, she discovers that the plants do not need sunlight—they bloom to the sound of soft lullabies.',
    author: 'Jinssi',
    authorRole: 'Botanical Lorekeeper',
    coverImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2198150/ss_1a98b0d5e8111f100b3ececda8f682333337e3cb.1920x1080.jpg',
    coverAlt: 'A mystical glass conservatory filled with glowing blue ferns, ancient botanical books, and warm fairy lights.',
    status: 'Ongoing',
    genre: 'Cozy Fantasy',
    tags: ['Fantasy', 'Plants', 'Magic', 'Relaxing', 'Nature'],
    totalChapters: 2,
    rating: 5,
    readsCount: 980,
    chapters: [
      {
        id: 'ag-ch1',
        chapterNumber: 1,
        title: 'Keys to the Glass Pavilion',
        wordCount: 850,
        readTimeMinutes: 4,
        publishedDate: 'Sep 8, 2026',
        authorNote: 'Step inside the humid, fragrant warmth of the conservatory. Enjoy!',
        content: [
          'The iron key was as heavy as a river stone and shaped like a curling fern frond. When I inserted it into the moss-encrusted lock of the conservatory door, the mechanism turned with a deep, musical chime that resonated through the glass panes.',
          'I pushed the heavy double doors inward. A wave of humid, scented air rushed to greet me—damp peat, crushed eucalyptus, sweet jasmine, and an intoxicating hint of candied ginger. Decades of wild growth had turned the Victorian pavilion into a lush jungle.',
          'Giant creeping wisteria hung like purple waterfalls from the wrought-iron ceiling struts forty feet above. Spiraling stone stairs wound around a central pillar of white marble, leading to elevated walkways lined with terracotta planters.',
          'On the workbench in the center of the rotunda sat an open leather journal. The handwriting on the parchment was delicate and faded: *To whoever inherits this glass sanctuary: do not bring poison or synthetic fertilizer into these halls. The soil here feeds on music, and the flowers listen to the words you whisper when you think nobody is around.*',
          'I pulled off my wool traveling cloak and laid it across the wooden bench. Outside, cold mountain wind howled against the leaded glass. But inside the pavilion, the air was warm, alive, and breathing.',
        ],
      },
      {
        id: 'ag-ch2',
        chapterNumber: 2,
        title: 'The Fern That Sings at Dusk',
        wordCount: 890,
        readTimeMinutes: 4,
        publishedDate: 'Sep 9, 2026',
        authorNote: 'Chapter 2 explores the magical biology of twilight flora.',
        content: [
          'As twilight painted the glass dome in shades of indigo and violet, the conservatory began to change. During daylight, the plants appeared ordinary—green fronds, silver leaves, and woody vines.',
          'But as the sun dipped behind the mountain ridge, tiny bioluminescent pulses began to ripple through the foliage. Deep in the central flowerbed grew a cluster of *Nocturne Ferns*. Their fronds were tipped with pale azure pearls that pulsed with soft, rhythmic light, mimicking the heartbeat of a sleeping child.',
          'I sat on the low stone ledge beside them, remembering the alchemist\'s journal notes. Feeling self-conscious, I cleared my throat and began to hum an old lullaby my grandmother used to sing while baking bread on winter afternoons.',
          'The effect was immediate. The azure pearls began to glow brighter, casting gentle ripples of cerulean light across my hands and face. The fronds slowly unfurled toward me, releasing a delicate fragrance like powdered vanilla and honeyed rainfall.',
          'In that moment, all the fatigue from my long journey, the anxieties of the city, and the weight of self-doubt dissolved into the quiet warmth of the greenhouse. Here, in the shelter of the glass pavilion, growth did not demand hurry. It only asked for patience, melody, and care.',
        ],
      },
    ],
  },
];
