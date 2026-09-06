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
  category: string;
  description: string;
  accentColor: string;
  coverImage: string;
  coverAlt: string;
  walkthrough: WalkthroughSection[];
}

export const categories = [
  'All',
  'Cozy Games',
  'Puzzle',
  'Organization',
  'Life Sim',
];

export const games: Game[] = [
  {
    id: 'librarian',
    title: 'Librarian: tidy up the arcane library',
    developer: 'Tomebound Studio',
    category: 'Organization',
    description: 'Sort dusty tomes, organize enchanted shelves, and restore order to a magical library that has been left in chaos for centuries.',
    accentColor: '#c98a52',
    coverImage: 'https://images.pexels.com/photos/12593769/pexels-photo-12593769.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    coverAlt: 'A cozy home library with filled wooden bookshelves and a warm reading lamp.',
    walkthrough: [
      {
        id: 'ch1',
        title: 'Getting Started: The First Floor',
        steps: [
          {
            id: 's1',
            title: 'Enter the main hall',
            description: 'Walk through the grand doors and take in the full scope of the mess. Talk to the head librarian near the entrance to receive your first assignment.',
            image: 'https://images.pexels.com/photos/29765221/pexels-photo-29765221.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'Warm ambient lighting in a home library with bookshelves.',
          },
          {
            id: 's2',
            title: 'Pick up the sorting gloves',
            description: 'Find the protective gloves on the front desk. They are essential — some books will try to fly back to their old spots without them.',
            image: 'https://images.pexels.com/photos/4107106/pexels-photo-4107106.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'A woman in green gloves organizing books on a wooden shelf.',
          },
          {
            id: 's3',
            title: 'Sort books by color aura',
            description: 'Each magical book glows with a faint colored aura. Group them by color: red for fire magic, blue for water, green for nature, and gold for history.',
            image: 'https://images.pexels.com/photos/7703306/pexels-photo-7703306.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'Hands organizing books on a shelf in a warm, cozy indoor setting.',
            hasSpoiler: true,
            spoilerText: 'The gold aura books are actually disguised fire magic — check them by holding them near a candle. If the flame flickers, it belongs in the red section.',
          },
          {
            id: 's4',
            title: 'Dust the enchanted shelves',
            description: 'Use the feather duster on every shelf before placing books back. Dusty shelves reduce the sorting bonus by 50%.',
            image: 'https://images.pexels.com/photos/4440614/pexels-photo-4440614.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'A woman cleans a bookshelf using a cloth, organizing books in a tidy home environment.',
          },
        ],
      },
      {
        id: 'ch2',
        title: 'The Restricted Section',
        steps: [
          {
            id: 's5',
            title: 'Unlock the restricted door',
            description: 'The head librarian will give you a brass key after completing the first floor. Use it on the iron door at the back of the hall.',
            image: 'https://images.pexels.com/photos/16433564/pexels-photo-16433564.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'Warm and inviting reading corner with bookshelves, wooden chair, and plant decor.',
          },
          {
            id: 's6',
            title: 'Calms the whispering books',
            description: 'Some books in this section whisper loudly and disturb your concentration. Place them face-down to silence them.',
            image: 'https://images.pexels.com/photos/34438594/pexels-photo-34438594.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'Neatly arranged bookshelf containing various educational books and documents.',
            hasSpoiler: true,
            spoilerText: 'The book titled "Lost Tongues" will never stop whispering. You must place a heavy paperweight on top of it to silence it permanently.',
          },
          {
            id: 's7',
            title: 'Organize by alphabetical curse',
            description: 'Books here are sorted by the first letter of their curse, not their title. Read the small inscription on each spine.',
            image: 'https://images.pexels.com/photos/12593769/pexels-photo-12593769.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'A cozy home library with filled wooden bookshelves and a warm reading lamp.',
          },
        ],
      },
      {
        id: 'ch3',
        title: 'The Grand Restoration',
        steps: [
          {
            id: 's8',
            title: 'Repair torn pages',
            description: 'Use the mending tape from your inventory on any book with visible damage. Each repaired book gives you bonus library reputation.',
            image: 'https://images.pexels.com/photos/4440614/pexels-photo-4440614.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'A woman cleans a bookshelf using a cloth, organizing books in a tidy home environment.',
          },
          {
            id: 's9',
            title: 'Re-shelve the floating books',
            description: 'Some books float near the ceiling. Use the ladder on the east wall to reach them. Gently pull them down and place them in the correct section.',
            image: 'https://images.pexels.com/photos/7703306/pexels-photo-7703306.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'Hands organizing books on a shelf in a warm, cozy indoor setting.',
            hasSpoiler: true,
            spoilerText: 'The fastest way to bring down floating books is to cast the "Gravity" spell learned in Chapter 2. It pulls all floating books down at once.',
          },
          {
            id: 's10',
            title: 'Report to the head librarian',
            description: 'Return to the entrance and speak to the head librarian to complete the restoration. You will receive the "Keeper of Tomes" achievement.',
            image: 'https://images.pexels.com/photos/29765221/pexels-photo-29765221.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'Warm ambient lighting in a home library with bookshelves.',
          },
        ],
      },
    ],
  },
  {
    id: 'cellar-keeper',
    title: 'Cellar keeper',
    developer: 'Oakwood Games',
    category: 'Organization',
    description: 'Manage a sprawling wine cellar beneath an old countryside inn. Sort bottles, manage temperature zones, and keep the inventory pristine.',
    accentColor: '#8f5a33',
    coverImage: 'https://images.pexels.com/photos/7015332/pexels-photo-7015332.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    coverAlt: 'Wine bottles neatly arranged on a rack against a rustic wall, in a cozy cellar.',
    walkthrough: [
      {
        id: 'ch1',
        title: 'Setting Up the Cellar',
        steps: [
          {
            id: 's1',
            title: 'Inspect the cellar conditions',
            description: 'Walk down the stone stairs and check the temperature gauge near the entrance. The ideal temperature is between 12 and 14 degrees Celsius.',
            image: 'https://images.pexels.com/photos/8583530/pexels-photo-8583530.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'Stylish indoor wine cellar with wooden racks and a granite countertop sink.',
          },
          {
            id: 's2',
            title: 'Adjust the cooling dial',
            description: 'If the temperature is too high, turn the cooling dial near the door clockwise. Wait for the gauge to settle before proceeding.',
            image: 'https://images.pexels.com/photos/2664150/pexels-photo-2664150.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'Wooden shelves in a wine cellar showcasing beer and wine bottles with a brick wall backdrop.',
          },
          {
            id: 's3',
            title: 'Sort bottles by region',
            description: 'Each bottle has a small label indicating its region. Group them: reds on the left wall, whites on the right, and sparkling near the entrance.',
            image: 'https://images.pexels.com/photos/11851422/pexels-photo-11851422.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'Close-up of wine bottles and glasses on wooden shelves in a dimly lit cellar.',
            hasSpoiler: true,
            spoilerText: 'The unlabeled bottles with green glass are always from the local region. Place them on the bottom shelf of the left wall for a hidden bonus.',
          },
        ],
      },
      {
        id: 'ch2',
        title: 'The VIP Delivery',
        steps: [
          {
            id: 's4',
            title: 'Receive the delivery order',
            description: 'The innkeeper will hand you a scroll with the VIP guest\'s requested bottles. Read it carefully — some requests specify vintage years.',
            image: 'https://images.pexels.com/photos/19393193/pexels-photo-19393193.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'A beautifully organized wine cellar with wooden shelves displaying a variety of wine bottles.',
          },
          {
            id: 's5',
            title: 'Locate the requested vintages',
            description: 'Use the inventory ledger on the desk to find which shelf each vintage is stored on. Cross-reference the year and region.',
            image: 'https://images.pexels.com/photos/30557566/pexels-photo-30557566.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'Discover an elegant wine cellar display with rows of wine bottles in Pauillac, France.',
            hasSpoiler: true,
            spoilerText: 'The 1947 vintage is hidden behind a loose stone in the back wall. Press the third stone from the left at eye level to reveal the secret compartment.',
          },
          {
            id: 's6',
            title: 'Polish and present the bottles',
            description: 'Use the linen cloth from the supply chest to wipe each bottle clean. Place them on the silver tray near the stairs for the innkeeper to collect.',
            image: 'https://images.pexels.com/photos/35740712/pexels-photo-35740712.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'Rows of stacked wine bottles in a dimly lit cellar with elegant symmetry and warm tones.',
          },
        ],
      },
      {
        id: 'ch3',
        title: 'The Annual Tasting Event',
        steps: [
          {
            id: 's7',
            title: 'Prepare the tasting table',
            description: 'Set up the long oak table on the cellar\'s upper level. Place glasses, tasting notes, and a spittoon at each seat.',
            image: 'https://images.pexels.com/photos/8583530/pexels-photo-8583530.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'Stylish indoor wine cellar with wooden racks and a granite countertop sink.',
          },
          {
            id: 's8',
            title: 'Select the featured bottles',
            description: 'Choose 5 bottles that represent different regions and flavor profiles. Balance reds, whites, and one sparkling.',
            image: 'https://images.pexels.com/photos/30557559/pexels-photo-30557559.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'Vintage wine bottles beautifully displayed in a Pauillac cellar.',
            hasSpoiler: true,
            spoilerText: 'The crowd favorite is always the unlabeled green bottle from the local region. Include it as your 5th selection for a perfect rating.',
          },
          {
            id: 's9',
            title: 'Welcome the guests',
            description: 'Open the cellar doors at 7 PM in-game time. Greet each guest as they arrive and guide them to their seats.',
            image: 'https://images.pexels.com/photos/7015332/pexels-photo-7015332.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'Wine bottles neatly arranged on a rack against a rustic wall, in a cozy cellar.',
          },
        ],
      },
    ],
  },
  {
    id: 'sort-ducks',
    title: 'sort them ducks',
    developer: 'Puddle Games',
    category: 'Puzzle',
    description: 'A whimsical puzzle game about sorting rubber ducks by color, size, and personality. Each pond has its own quirky rules to figure out.',
    accentColor: '#e58080',
    coverImage: 'https://images.pexels.com/photos/132464/pexels-photo-132464.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    coverAlt: 'Green and yellow rubber duck toys isolated on a white background.',
    walkthrough: [
      {
        id: 'ch1',
        title: 'Pond One: Color Sorting',
        steps: [
          {
            id: 's1',
            title: 'Survey the pond',
            description: 'Look at all the ducks floating in the pond. You will see red, yellow, blue, and green ducks mixed together.',
            image: 'https://images.pexels.com/photos/106144/rubber-duck-bath-duck-toys-costume-106144.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'Vibrant rubber ducks floating in a narrow outdoor water canal, creating a playful scene.',
          },
          {
            id: 's2',
            title: 'Drag ducks to matching lanes',
            description: 'Tap and drag each duck to the lane that matches its color. The lanes are marked with colored flags at the pond\'s edge.',
            image: 'https://images.pexels.com/photos/6921245/pexels-photo-6921245.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'Two cute yellow rubber ducks sitting on a dark surface.',
          },
          {
            id: 's3',
            title: 'Handle the stubborn ducks',
            description: 'Some ducks will waddle back to their original spot. Drag them twice quickly to convince them to stay in the correct lane.',
            image: 'https://images.pexels.com/photos/132464/pexels-photo-132464.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'Green and yellow rubber duck toys isolated on a white background.',
            hasSpoiler: true,
            spoilerText: 'The stubborn ducks are always the ones with a tiny scratch on their beak. You can sort them last to save time.',
          },
        ],
      },
      {
        id: 'ch2',
        title: 'Pond Two: Size & Personality',
        steps: [
          {
            id: 's4',
            title: 'Sort by size first',
            description: 'This pond has ducks of three sizes: small, medium, and large. Drag them to the size-marked platforms near the water\'s edge.',
            image: 'https://images.pexels.com/photos/34365301/pexels-photo-34365301.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'A group of fluffy yellow and brown ducklings swimming together in a sunlit pond.',
          },
          {
            id: 's5',
            title: 'Read personality bubbles',
            description: 'Each duck has a small thought bubble showing its personality icon. Match happy ducks with happy ducks, grumpy with grumpy.',
            image: 'https://images.pexels.com/photos/33319473/pexels-photo-33319473.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'A mallard duck stands peacefully by the lake shore under the sun.',
            hasSpoiler: true,
            spoilerText: 'Ducks with the star icon are wildcards — they are happy in any group. Use them to fill gaps in your sorting.',
          },
          {
            id: 's6',
            title: 'Complete the harmony bonus',
            description: 'When all ducks in a group share the same personality, you get a harmony bonus. Aim for all groups to be harmonious.',
            image: 'https://images.pexels.com/photos/35671567/pexels-photo-35671567.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'Two mallard ducks gracefully swimming in shimmering water surface on a sunny day.',
          },
        ],
      },
      {
        id: 'ch3',
        title: 'Pond Three: The Great Duck Parade',
        steps: [
          {
            id: 's7',
            title: 'Arrange ducks in a parade line',
            description: 'Drag ducks into a single-file line. The order must follow the pattern: small, medium, large, small, medium, large.',
            image: 'https://images.pexels.com/photos/33693383/pexels-photo-33693383.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'A group of ducks swimming peacefully in a sunlit pond surrounded by lush greenery.',
          },
          {
            id: 's8',
            title: 'Add the parade leader',
            description: 'Place the golden duck at the front of the line. It can be found hiding behind the lily pads on the left side of the pond.',
            image: 'https://images.pexels.com/photos/106144/rubber-duck-bath-duck-toys-costume-106144.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'Vibrant rubber ducks floating in a narrow outdoor water canal, creating a playful scene.',
            hasSpoiler: true,
            spoilerText: 'Tap the largest lily pad three times to reveal the golden duck. It will not appear until you do this.',
          },
          {
            id: 's9',
            title: 'Start the parade',
            description: 'Once the line is complete and the golden duck is in front, tap the golden duck to begin the parade. Enjoy the celebration!',
            image: 'https://images.pexels.com/photos/34694283/pexels-photo-34694283.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'A peaceful scene of ducks flying over a tranquil lake on a sunny day.',
          },
        ],
      },
    ],
  },
  {
    id: 'konbini-cleanup',
    title: 'konbini cleanup',
    developer: 'Night Shift Studio',
    category: 'Life Sim',
    description: 'Run the night shift at a tiny Japanese convenience store. Restock shelves, clean spills, and keep the store sparkling for the morning rush.',
    accentColor: '#f5724e',
    coverImage: 'https://images.pexels.com/photos/38698664/pexels-photo-38698664.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    coverAlt: 'A cozy shop interior featuring a vintage weighing scale and a variety of products on display.',
    walkthrough: [
      {
        id: 'ch1',
        title: 'Shift One: The Night Begins',
        steps: [
          {
            id: 's1',
            title: 'Clock in at the register',
            description: 'Walk to the back of the store and press the green button on the time clock. Put on your apron from the hook next to it.',
            image: 'https://images.pexels.com/photos/34357798/pexels-photo-34357798.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'Shelf packed with diverse Asian snacks and groceries in an inviting store setting.',
          },
          {
            id: 's2',
            title: 'Restock the snack aisle',
            description: 'Open the storage room behind the register. Carry boxes of snacks to aisle 1 and place items with labels facing forward.',
            image: 'https://images.pexels.com/photos/3423860/pexels-photo-3423860.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'Explore a bustling Tokyo convenience store aisle packed with diverse products.',
          },
          {
            id: 's3',
            title: 'Check expiration dates',
            description: 'Go through every item on the shelf. Tap any item past its expiration date to remove it and place it in the waste bin.',
            image: 'https://images.pexels.com/photos/4701590/pexels-photo-4701590.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'Close-up view of assorted drinks inside a refrigerated store display case.',
            hasSpoiler: true,
            spoilerText: 'The onigiri (rice balls) expire the fastest. Check them first — they are always on the top shelf of the refrigerated section.',
          },
        ],
      },
      {
        id: 'ch2',
        title: 'Shift Two: The Midnight Rush',
        steps: [
          {
            id: 's4',
            title: 'Clean the spilled drink',
            description: 'A customer knocked over a drink near aisle 2. Grab the mop from the supply closet and clean the puddle before anyone slips.',
            image: 'https://images.pexels.com/photos/29409104/pexels-photo-29409104.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'Refrigerator display with various beverages and snacks in a store environment.',
          },
          {
            id: 's5',
            title: 'Restock the drink cooler',
            description: 'The cooler is running low on green tea and coffee. Restock from the back room, placing newer items behind older ones.',
            image: 'https://images.pexels.com/photos/4701590/pexels-photo-4701590.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'Close-up view of assorted drinks inside a refrigerated store display case.',
            hasSpoiler: true,
            spoilerText: 'Always restock the coffee on the left side and tea on the right. Customers grab coffee first — having it on the left reduces wait times.',
          },
          {
            id: 's6',
            title: 'Greet the regular customer',
            description: 'Around 1 AM, a regular customer in a yellow hat arrives. Greet him warmly — he always buys the same thing and tips well.',
            image: 'https://images.pexels.com/photos/15460720/pexels-photo-15460720.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'A dimly lit convenience store in London at night with a motorbike parked outside.',
          },
        ],
      },
      {
        id: 'ch3',
        title: 'Shift Three: The Morning Prep',
        steps: [
          {
            id: 's7',
            title: 'Brew the morning coffee',
            description: 'At 5 AM, start brewing the first batch of coffee. Fill the machine, add a fresh filter, and press the start button.',
            image: 'https://images.pexels.com/photos/38698664/pexels-photo-38698664.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'A cozy shop interior featuring a vintage weighing scale and a variety of products on display.',
          },
          {
            id: 's8',
            title: 'Prepare the bento boxes',
            description: 'Assemble 10 bento boxes from the ingredients in the back kitchen. Each box needs rice, a main dish, and two sides.',
            image: 'https://images.pexels.com/photos/34357798/pexels-photo-34357798.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'Shelf packed with diverse Asian snacks and groceries in an inviting store setting.',
            hasSpoiler: true,
            spoilerText: 'The most popular bento combination is chicken karaage with pickled vegetables and miso soup. Make 6 of these for the morning rush.',
          },
          {
            id: 's9',
            title: 'Clock out and hand over',
            description: 'At 7 AM, the day shift arrives. Brief them on what was restocked, then clock out at the time clock in the back.',
            image: 'https://images.pexels.com/photos/20123968/pexels-photo-20123968.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: '7-Eleven convenience store sign and storefront, open 24 hours in an urban setting.',
          },
        ],
      },
    ],
  },
  {
    id: 'restore-records',
    title: 're:store the record store',
    developer: 'Vinyl Revival',
    category: 'Organization',
    description: 'Breathe life back into an abandoned record shop. Clean dusty vinyl, organize genres, repair equipment, and reopen to a warm community welcome.',
    accentColor: '#b07240',
    coverImage: 'https://images.pexels.com/photos/34025461/pexels-photo-34025461.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    coverAlt: 'Warm interior view of a record store with vintage vinyls, retro decor, and a neon Records sign.',
    walkthrough: [
      {
        id: 'ch1',
        title: 'Cleaning Up the Shop',
        steps: [
          {
            id: 's1',
            title: 'Enter the abandoned shop',
            description: 'Unlock the front door with the key from the envelope taped to the mailbox. Step inside and assess the dust and clutter.',
            image: 'https://images.pexels.com/photos/16751810/pexels-photo-16751810.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'A nostalgic record store interior featuring vinyl displays and warm lighting.',
          },
          {
            id: 's2',
            title: 'Clean the vinyl records',
            description: 'Use the microfiber cloth from the supply box near the counter. Wipe each record in a circular motion from center to edge.',
            image: 'https://images.pexels.com/photos/6827297/pexels-photo-6827297.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'Close-up of hands searching through vinyl records, depicting a personal music shopping experience.',
          },
          {
            id: 's3',
            title: 'Repair the turntable',
            description: 'The turntable on the listening station has a broken belt. Open the back panel and replace it with the spare from the drawer.',
            image: 'https://images.pexels.com/photos/11626746/pexels-photo-11626746.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'A woman sitting in an armchair, exploring a collection of vinyl records in a cozy indoor setting.',
            hasSpoiler: true,
            spoilerText: 'The spare belt is not in the drawer — it is taped to the underside of the turntable itself. Flip it over to find it.',
          },
        ],
      },
      {
        id: 'ch2',
        title: 'Organizing the Collection',
        steps: [
          {
            id: 's4',
            title: 'Sort records by genre',
            description: 'Group records into sections: Jazz, Rock, Soul, Classical, and Soundtracks. Use the colored dividers from the storage room.',
            image: 'https://images.pexels.com/photos/1181776/pexels-photo-1181776.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'Close-up view of alphabetically organized vinyl records in an indoor music store setting.',
          },
          {
            id: 's5',
            title: 'Alphabetize within each genre',
            description: 'Within each genre section, arrange records alphabetically by artist name. Use the label on the spine of each sleeve.',
            image: 'https://images.pexels.com/photos/10905234/pexels-photo-10905234.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'Close-up of diverse vinyl records neatly stacked on a shelf.',
            hasSpoiler: true,
            spoilerText: 'Records with no artist name on the spine are compilation albums. Place these at the very end of each genre section, after Z.',
          },
          {
            id: 's6',
            title: 'Set up the listening station',
            description: 'Place the repaired turntable on the listening table near the window. Connect it to the speakers and test with a record.',
            image: 'https://images.pexels.com/photos/33050284/pexels-photo-33050284.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'Warm interior of a cafe with vinyl records and a bar area in Vietnam.',
          },
        ],
      },
      {
        id: 'ch3',
        title: 'Grand Reopening',
        steps: [
          {
            id: 's7',
            title: 'Decorate the storefront',
            description: 'Hang the warm string lights above the entrance. Place the "Open" sign in the window and the welcome mat at the door.',
            image: 'https://images.pexels.com/photos/34025461/pexels-photo-34025461.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'Warm interior view of a record store with vintage vinyls, retro decor, and a neon Records sign.',
          },
          {
            id: 's8',
            title: 'Curate the opening day playlist',
            description: 'Select 10 records to play throughout the day. Mix genres to appeal to all customers who walk in.',
            image: 'https://images.pexels.com/photos/844921/pexels-photo-844921.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'A neat stack of vinyl records on a minimalist white wall shelf.',
            hasSpoiler: true,
            spoilerText: 'Start with a jazz record — the first customer is always a jazz lover, and a good first impression boosts your daily rating.',
          },
          {
            id: 's9',
            title: 'Welcome your first customers',
            description: 'Open the door at 10 AM. Greet each customer, offer them the listening station, and help them find what they are looking for.',
            image: 'https://images.pexels.com/photos/16751810/pexels-photo-16751810.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            imageAlt: 'A nostalgic record store interior featuring vinyl displays and warm lighting.',
          },
        ],
      },
    ],
  },
];
