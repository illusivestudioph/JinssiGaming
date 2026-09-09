import type { Story } from '../stories';

export const mysteryBooks: Story[] = [
  {
    id: 'hound-of-baskervilles',
    slug: 'the-hound-of-the-baskervilles',
    title: 'The Hound of the Baskervilles',
    synopsis: 'Sherlock Holmes and Dr. Watson investigate the ancient family curse of a colossal spectral hound that haunts the treacherous, fog-drenched Dartmoor mires after the sudden death of Sir Charles Baskerville.',
    author: 'Arthur Conan Doyle',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=800&q=80',
    coverAlt: 'A solitary lantern casting light on a foggy cobblestone lane at midnight.',
    status: 'Completed',
    genre: 'Mystery',
    tags: ['Public Domain', 'Gothic Mystery', 'Sherlock Holmes', 'Dartmoor', 'Classic'],
    totalChapters: 12,
    rating: 5,
    readsCount: 5980,
    isPublicDomain: true,
    chapters: [
      {
        id: 'hob-ch1',
        chapterNumber: 1,
        title: 'Mr. Sherlock Holmes',
        wordCount: 840,
        readTimeMinutes: 4,
        publishedDate: '1902',
        authorNote: 'Holmes examines the walking stick left behind by Dr. James Mortimer.',
        content: [
          'Mr. Sherlock Holmes, who was usually very late in the mornings, save upon those not infrequent occasions when he was up all night, was seated at the breakfast table. I stood upon the hearth-rug and picked up the stick which our visitor had left behind him the night before.',
          'It was a fine, thick piece of wood, bulbous-headed, of the sort which is known as a "Penang lawyer." Just under the head was a broad silver band nearly an inch across. "To James Mortimer, M.R.C.S., from his friends of the C.C.H.," was engraved upon it, with the date "1884."',
          '"Well, Watson, what do you make of it?" Holmes asked, leaning back with a cloud of pipe smoke.'
        ]
      },
      {
        id: 'hob-ch2',
        chapterNumber: 2,
        title: 'The Curse of the Baskervilles',
        wordCount: 870,
        readTimeMinutes: 4,
        publishedDate: '1902',
        authorNote: 'Dr. Mortimer reads the 1742 manuscript of Hugo Baskerville and the hound.',
        content: [
          'Dr. Mortimer drew an ancient yellowed manuscript from his breast-pocket, written in the crabbed script of the mid-eighteenth century.',
          'It recorded how the wicked Sir Hugo Baskerville, pursuing a terrified maiden across the moor on Michaelmas night, was found dead beside a deep dip or coombe.',
          'Standing over Hugo and plucking at his throat stood a foul thing, a great, black beast, shaped like a hound, yet larger than any hound that ever mortal eye had rested upon.',
          'Mortimer looked up at Holmes with eyes full of terror: "Sir Charles Baskerville was found dead in the yew alley three weeks ago. Not far from the body on the moist gravel were footprints."',
          '"A man’s or a woman’s?" asked Holmes.',
          'Dr. Mortimer lowered his voice: "Mr. Holmes, they were the footprints of a gigantic hound!"'
        ]
      },
      {
        id: 'hob-ch3',
        chapterNumber: 3,
        title: 'The Problem',
        wordCount: 850,
        readTimeMinutes: 4,
        publishedDate: '1902',
        authorNote: 'Holmes and Watson consider whether Sir Henry Baskerville should go to Devonshire.',
        content: [
          'Holmes sat for an hour in his dressing-gown, smoking his strongest shag tobacco in concentrated silence.',
          'Sir Henry Baskerville, the nephew and sole heir, had just arrived from Canada.',
          'That very morning at his London hotel, Sir Henry had received an anonymous warning composed of words cut from The Times: "As you value your life or your reason keep away from the moor."',
          'Worse still, one of Sir Henry’s new tan boots had been mysteriously stolen from outside his hotel bedroom door.'
        ]
      },
      {
        id: 'hob-ch4',
        chapterNumber: 4,
        title: 'Sir Henry Baskerville',
        wordCount: 860,
        readTimeMinutes: 4,
        publishedDate: '1902',
        authorNote: 'Meeting the resolute Canadian heir and discovering the spy in Regent Street.',
        content: [
          'Sir Henry Baskerville was a small, alert, dark-eyed man of about thirty, with sturdy limbs and a fiery, courageous disposition.',
          '"There is no devil in hell, Mr. Holmes, and there is no man upon earth who can prevent me from going to the home of my own people," he declared.',
          'As they left Baker Street, Holmes spotted a cab shadowing Sir Henry. The passenger had a bushy black beard.',
          'Holmes took the cab number, but the spy slipped away into the London traffic.'
        ]
      },
      {
        id: 'hob-ch5',
        chapterNumber: 5,
        title: 'Three Broken Threads',
        wordCount: 840,
        readTimeMinutes: 4,
        publishedDate: '1902',
        authorNote: 'Holmes dispatches Watson to Dartmoor to act as Sir Henry’s armed bodyguard.',
        content: [
          'Holmes sent telegrams and inquiries, but every lead broke in his hands.',
          'Unable to leave London himself, Holmes instructed Watson to accompany Sir Henry to Baskerville Hall, armed with a revolver, and report every detail of the household and neighbors.',
          '"Bear in mind, Watson," Holmes cautioned gravely at Paddington station, "that you are going into the presence of danger. Trust no one, and never leave Sir Henry alone upon the moor after dark."'
        ]
      },
      {
        id: 'hob-ch6',
        chapterNumber: 6,
        title: 'Baskerville Hall',
        wordCount: 880,
        readTimeMinutes: 4,
        publishedDate: '1902',
        authorNote: 'Arrival in Devonshire through armed patrols guarding against the escaped convict.',
        content: [
          'The train carried them through the green lanes of Devonshire to the borders of the grim granite moor.',
          'Armed soldiers stood at the crossroads: Selden, the notorious Notting Hill murderer, had escaped from Princetown prison and was hiding somewhere among the rocky tors.',
          'Baskerville Hall was a gloomy manor of dark granite, flanked by ancient towers and backed by black firs.',
          'Barrymore, the butler with the heavy black beard, welcomed them with stiff civility.',
          'That night, lying awake in the drafty bedroom, Watson heard the distinct, muffled sobbing of a weeping woman echoing down the stone corridor.'
        ]
      },
      {
        id: 'hob-ch7',
        chapterNumber: 7,
        title: 'The Stapletons of Merripit House',
        wordCount: 890,
        readTimeMinutes: 5,
        publishedDate: '1902',
        authorNote: 'Watson meets the naturalist Stapleton and the treacherous Grimpen Mire.',
        content: [
          'The next morning Watson walked across the moor to Merripit House, meeting Jack Stapleton, a lively naturalist with a butterfly net.',
          'Stapleton pointed out the great Grimpen Mire, an innocent-looking bright green bog where ponies and men sank to their deaths in the black slime.',
          'Suddenly, rolling across the desolate waste, came a long, deep, melancholy howl that curdled Watson’s blood.',
          'Stapleton’s beautiful sister Beryl mistook Watson for Sir Henry, frantically whispering: "Go back! Go straight back to London this very night! I cannot tell you why, but for your life’s sake, never set foot upon this moor again!"'
        ]
      },
      {
        id: 'hob-ch8',
        chapterNumber: 8,
        title: 'First Report of Dr. Watson',
        wordCount: 860,
        readTimeMinutes: 4,
        publishedDate: '1902',
        authorNote: 'Watson’s letter to Holmes recounting nocturnal candle signals.',
        content: [
          'Watson observed Sir Henry falling deeply in love with Beryl Stapleton, while her brother reacted with furious, unreasonable jealousy.',
          'At two in the morning, Watson caught Barrymore creeping down the hall to a window facing the moor, holding a lighted candle.',
          'Looking out into the black night, Watson saw an answering flicker of light from the jagged granite tor half a mile away.',
          'Someone was signaling to the escaped convict!'
        ]
      },
      {
        id: 'hob-ch9',
        chapterNumber: 9,
        title: 'The Light Upon the Moor',
        wordCount: 870,
        readTimeMinutes: 4,
        publishedDate: '1902',
        authorNote: 'Sir Henry and Watson ambush Barrymore and hunt the convict in the rain.',
        content: [
          'Sir Henry and Watson confronted Barrymore at the window.',
          'Mrs. Barrymore burst in weeping, confessing that Selden the convict was her youngest brother, starving on the moor.',
          'Sir Henry and Watson ran out into the driving rain to capture the felon.',
          'By the light of the moon on the Black Tor above them, Watson caught sight of another figure—a tall, thin man standing silhouetted against the sky, arms folded, watching them from the granite heights.'
        ]
      },
      {
        id: 'hob-ch10',
        chapterNumber: 10,
        title: 'The Man on the Tor',
        wordCount: 910,
        readTimeMinutes: 5,
        publishedDate: '1902',
        authorNote: 'Watson tracks the mysterious watcher to a prehistoric stone hut.',
        content: [
          'Determined to unmask the watcher, Watson searched the prehistoric stone huts of the moor.',
          'In one hut he found a pannikin, a pile of dry heather, and a discarded cigarette end stamped "Bradley, Oxford Street."',
          'A shadow fell across the threshold, and a cool, familiar voice spoke: "It is a lovely evening, my dear Watson."',
          'It was Sherlock Holmes himself! Holmes had lived secretly in the hut for days, watching Stapleton weave his web.'
        ]
      },
      {
        id: 'hob-ch11',
        chapterNumber: 11,
        title: 'Death on the Moor',
        wordCount: 920,
        readTimeMinutes: 5,
        publishedDate: '1902',
        authorNote: 'The hound strikes, but kills the wrong victim.',
        content: [
          'As Holmes and Watson conferred, a blood-curdling baying echoed from the Grimpen Mire, followed by screams of mortal agony.',
          'They rushed through the boulders and found a body dashed to pieces at the foot of a cliff.',
          'For an instant Watson thought it was Sir Henry, but it was Selden the convict, who had been given Sir Henry’s cast-off clothes by Barrymore!',
          'The scent on the clothes had drawn the hound to its prey.',
          'Stapleton stepped out of the darkness with an oil lantern, unable to conceal his astonishment at finding Holmes standing beside the corpse.'
        ]
      },
      {
        id: 'hob-ch12',
        chapterNumber: 12,
        title: 'The Fog and the Hound of Fire',
        wordCount: 960,
        readTimeMinutes: 5,
        publishedDate: '1902',
        authorNote: 'The final confrontation at Merripit House as the white fog rolls in.',
        content: [
          'Holmes laid his trap: Sir Henry dined alone at Stapleton’s house, walking home alone across the moor while Holmes, Watson, and Inspector Lestrade lay in ambush.',
          'A thick white fog crept up from the Grimpen Mire like a ghostly tide, blinding their view.',
          'Then, bursting out of the mist, came the hound: a beast immense, coal-black, from whose open mouth spurted blue luminous fire, its eyes glowing with dull coals of phosphorescent flame!',
          'It leaped after Sir Henry. Holmes and Watson fired five revolver shots. The beast leaped into the air with a howl of agony and fell dead upon the moss, bathed in phosphorus.',
          'Stapleton fled into the treacherous mire in the dark, losing his footing on the bog path and sinking forever into the black depths of the Grimpen Mire.'
        ]
      }
    ]
  },

  {
    id: 'adventures-of-sherlock-holmes',
    slug: 'the-adventures-of-sherlock-holmes',
    title: 'The Adventures of Sherlock Holmes',
    synopsis: 'Arthur Conan Doyle’s landmark short story collection. Twelve brilliant investigations from 221B Baker Street, including A Scandal in Bohemia, The Red-Headed League, The Speckled Band, and The Blue Carbuncle.',
    author: 'Arthur Conan Doyle',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80',
    coverAlt: 'Sherlock Holmes pipe, violin, and magnifying glass beside 221B Baker Street hearth.',
    status: 'Completed',
    genre: 'Mystery',
    tags: ['Public Domain', 'Baker Street', 'Classic Mystery', 'Doyle', 'Victorian'],
    totalChapters: 12,
    rating: 5,
    readsCount: 6240,
    isPublicDomain: true,
    chapters: [
      { id: 'ash-ch1', chapterNumber: 1, title: 'A Scandal in Bohemia', wordCount: 880, readTimeMinutes: 4, publishedDate: '1892', content: ['The King of Bohemia seeks to recover an indiscreet photograph from the incomparable Irene Adler, who outwits Holmes at every turn, earning his lifelong respect as THE woman.'] },
      { id: 'ash-ch2', chapterNumber: 2, title: 'The Red-Headed League', wordCount: 870, readTimeMinutes: 4, publishedDate: '1892', content: ['Jabez Wilson is paid four pounds a week to copy the Encyclopaedia Britannica, unaware that thieves are tunneling into the City and Suburban Bank beneath his cellar.'] },
      { id: 'ash-ch3', chapterNumber: 3, title: 'A Case of Identity', wordCount: 840, readTimeMinutes: 4, publishedDate: '1892', content: ['Mary Sutherland’s mysterious fiancé Hosmer Angel vanishes on their wedding morning, unmasked by Holmes as her deceitful stepfather in disguise.'] },
      { id: 'ash-ch4', chapterNumber: 4, title: 'The Boscombe Valley Mystery', wordCount: 890, readTimeMinutes: 5, publishedDate: '1892', content: ['James McCarthy is accused of murdering his father by the pool, but Holmes proves an Australian bushranger with a cloak and left-handed grip was the true killer.'] },
      { id: 'ash-ch5', chapterNumber: 5, title: 'The Five Orange Pips', wordCount: 860, readTimeMinutes: 4, publishedDate: '1892', content: ['A young man receives an envelope containing five dried orange pips and the letters K.K.K., heralding a deadly secret society vengeance from America.'] },
      { id: 'ash-ch6', chapterNumber: 6, title: 'The Man with the Twisted Lip', wordCount: 880, readTimeMinutes: 4, publishedDate: '1892', content: ['Neville St. Clair disappears from an opium den in the East End, living a lucrative double life as Hugh Boone, the crippled professional beggar of Threadneedle Street.'] },
      { id: 'ash-ch7', chapterNumber: 7, title: 'The Adventure of the Blue Carbuncle', wordCount: 890, readTimeMinutes: 5, publishedDate: '1892', content: ['A precious Countess’s jewel is discovered inside the crop of a Christmas goose, leading Holmes through the markets of Covent Garden to the remorseful culprit James Ryder.'] },
      { id: 'ash-ch8', chapterNumber: 8, title: 'The Adventure of the Speckled Band', wordCount: 920, readTimeMinutes: 5, publishedDate: '1892', content: ['Helen Stoner fears for her life in the locked bedroom of Stoke Moran. Holmes discovers Dr. Roylott’s deadly swamp adder trained to slither down a dummy bell-rope.'] },
      { id: 'ash-ch9', chapterNumber: 9, title: 'The Adventure of the Engineer’s Thumb', wordCount: 850, readTimeMinutes: 4, publishedDate: '1892', content: ['Hydraulic engineer Victor Hatherley has his thumb severed while repairing an illicit coin-counterfeiting hydraulic press in a secluded country mansion.'] },
      { id: 'ash-ch10', chapterNumber: 10, title: 'The Adventure of the Noble Bachelor', wordCount: 840, readTimeMinutes: 4, publishedDate: '1892', content: ['Lord Robert St. Simon’s American bride Hatty Doran vanishes from the wedding breakfast, reuniting with her presumed-dead miner husband from California.'] },
      { id: 'ash-ch11', chapterNumber: 11, title: 'The Adventure of the Beryl Coronet', wordCount: 870, readTimeMinutes: 4, publishedDate: '1892', content: ['A priceless crown pledged to a senior partner at Alexander Holder’s bank is damaged in the night, saved by Holmes’s snow-footprint deduction in the garden.'] },
      { id: 'ash-ch12', chapterNumber: 12, title: 'The Adventure of the Copper Beeches', wordCount: 890, readTimeMinutes: 5, publishedDate: '1892', content: ['Violet Hunter takes a high-paying governess post requiring her to cut her hair and wear electric-blue dresses, unraveling a cruel imprisonment scheme.'] }
    ]
  },

  {
    id: 'innocence-of-father-brown',
    slug: 'the-innocence-of-father-brown',
    title: 'The Innocence of Father Brown',
    synopsis: 'G.K. Chesterton’s humble, umbrella-toting Roman Catholic priest solves baffling crimes not through forensic science, but through profound moral insight, psychological empathy, and spiritual wisdom.',
    author: 'G.K. Chesterton',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
    coverAlt: 'A quiet cobbled English village lane with an umbrella resting against a stone church door.',
    status: 'Completed',
    genre: 'Mystery',
    tags: ['Public Domain', 'Cozy Mystery', 'Father Brown', 'Chesterton', 'Classic'],
    totalChapters: 10,
    rating: 5,
    readsCount: 4520,
    isPublicDomain: true,
    chapters: [
      { id: 'fb-ch1', chapterNumber: 1, title: 'The Blue Cross', wordCount: 880, readTimeMinutes: 4, publishedDate: '1911', content: ['Valentin, the head of the Paris police, tracks the master criminal Flambeau through London by following an extraordinary trail of spilled sugar, flipped soup, and altered price tags left by a quiet priest carrying a priceless silver cross.'] },
      { id: 'fb-ch2', chapterNumber: 2, title: 'The Secret Garden of Paris', wordCount: 860, readTimeMinutes: 4, publishedDate: '1911', content: ['A severed head is found in Valentin’s locked private garden behind high spiked walls, leading to a tragic revelation about the fanatic French detective himself.'] },
      { id: 'fb-ch3', chapterNumber: 3, title: 'The Queer Feet', wordCount: 890, readTimeMinutes: 5, publishedDate: '1911', content: ['At the exclusive Twelve True Fishermen club dinner in the Vernon Hotel, a thief alternates between the quick step of a waiter and the leisurely stride of a gentleman to steal the golden cutlery.'] },
      { id: 'fb-ch4', chapterNumber: 4, title: 'The Flying Stars', wordCount: 840, readTimeMinutes: 4, publishedDate: '1911', content: ['Three priceless African diamonds are stolen during a Christmas Eve pantomime, where Flambeau plays the Harlequin until Father Brown corners his conscience by the garden gate.'] },
      { id: 'fb-ch5', chapterNumber: 5, title: 'The Invisible Man', wordCount: 870, readTimeMinutes: 4, publishedDate: '1911', content: ['A tiny inventor is murdered inside a guarded building that nobody entered or left—except the postman, whom society looks past as completely invisible.'] },
      { id: 'fb-ch6', chapterNumber: 6, title: 'The Honour of Israel Gow', wordCount: 850, readTimeMinutes: 4, publishedDate: '1911', content: ['In a decaying Scottish castle, the servant Israel Gow hoards loose diamonds, clockwork springs, and wax tapers according to a literal bequest of the deceased lord.'] },
      { id: 'fb-ch7', chapterNumber: 7, title: 'The Wrong Shape', wordCount: 860, readTimeMinutes: 4, publishedDate: '1911', content: ['The aesthetic poet Leonard Quinton is found stabbed with a curved Oriental dagger, his suicide note revealed to be a fragment of a novel dictated to his scheming doctor.'] },
      { id: 'fb-ch8', chapterNumber: 8, title: 'The Sins of Prince Saradine', wordCount: 880, readTimeMinutes: 4, publishedDate: '1911', content: ['A peaceful boating holiday on the Norfolk Broads turns into a deadly duel of Sicilian vengeance between brothers trading identities.'] },
      { id: 'fb-ch9', chapterNumber: 9, title: 'The Hammer of God', wordCount: 870, readTimeMinutes: 4, publishedDate: '1911', content: ['The wicked Norman Bohun is struck dead with a tiny smith’s hammer dropped from the soaring Gothic church spire above by his ascetic brother.'] },
      { id: 'fb-ch10', chapterNumber: 10, title: 'The Eye of Apollo', wordCount: 860, readTimeMinutes: 4, publishedDate: '1911', content: ['A sun-worshipping cult leader in a high London office building plots to seize an heiress’s typewriter-typed will by blinding her with the midday glare.'] }
    ]
  },

  {
    id: 'the-mystery-of-the-yellow-room',
    slug: 'the-mystery-of-the-yellow-room',
    title: 'The Mystery of the Yellow Room',
    synopsis: 'Gaston Leroux’s locked-room masterpiece. The youthful reporter Joseph Rouletabille investigates the inexplicable assassination attempt on Mademoiselle Stangerson inside a chamber bolted from the inside with barred windows.',
    author: 'Gaston Leroux',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
    coverAlt: 'A locked wooden door with antique brass keyhole in an old French chateau.',
    status: 'Completed',
    genre: 'Mystery',
    tags: ['Public Domain', 'Locked Room', 'Rouletabille', 'French Mystery', 'Classic'],
    totalChapters: 10,
    rating: 5,
    readsCount: 3940,
    isPublicDomain: true,
    chapters: [
      { id: 'myr-ch1', chapterNumber: 1, title: 'The Scream in the Night', wordCount: 850, readTimeMinutes: 4, publishedDate: '1907', content: ['At the secluded Chateau du Glandier, screams and pistol shots ring out from the Yellow Room. The oak door is locked on the inside, and iron bars seal the window.'] },
      { id: 'myr-ch2', chapterNumber: 2, title: 'Breaking the Door', wordCount: 860, readTimeMinutes: 4, publishedDate: '1907', content: ['Professor Stangerson and the gamekeeper batter down the heavy door. Mademoiselle Stangerson lies bleeding upon the floor, a bloody handprint stains the yellow wallpaper—yet the assassin has vanished into thin air!'] },
      { id: 'myr-ch3', chapterNumber: 3, title: 'Enter Rouletabille', wordCount: 840, readTimeMinutes: 4, publishedDate: '1907', content: ['Eighteen-year-old investigative journalist Joseph Rouletabille arrives from Paris with his notebook, declaring: "We must track the crime by the right end of reason!"'] },
      { id: 'myr-ch4', chapterNumber: 4, title: 'The Great Detective Frédéric Larsan', wordCount: 870, readTimeMinutes: 4, publishedDate: '1907', content: ['The famed Surete inspector Frédéric Larsan focuses on material clues—footprints, cane marks, and handkerchiefs—accusing the fiancé Robert Darzac.'] },
      { id: 'myr-ch5', chapterNumber: 5, title: 'Rouletabille’s Two Circles', wordCount: 860, readTimeMinutes: 4, publishedDate: '1907', content: ['Rouletabille draws two intersecting circles on his paper: the circle of external evidence and the circle of pure psychological logic.'] },
      { id: 'myr-ch6', chapterNumber: 6, title: 'The Disappearance in the Long Gallery', wordCount: 890, readTimeMinutes: 5, publishedDate: '1907', content: ['In the middle of the long, lighted corridor, the assassin is pursued from both ends by three armed men, yet vanishes into nothingness at the intersection.'] },
      { id: 'myr-ch7', chapterNumber: 7, title: 'The Secret of the Stangersons', wordCount: 850, readTimeMinutes: 4, publishedDate: '1907', content: ['Rouletabille discovers the tragic secret of Mademoiselle Stangerson’s youth in America and the shadow of the villain Ballmeyer.'] },
      { id: 'myr-ch8', chapterNumber: 8, title: 'The Journey to America', wordCount: 880, readTimeMinutes: 4, publishedDate: '1907', content: ['Rouletabille vanishes to America for two months to gather the missing link of identity, leaving Larsan to prepare the trial.'] },
      { id: 'myr-ch9', chapterNumber: 9, title: 'The Trial at the Palais de Justice', wordCount: 920, readTimeMinutes: 5, publishedDate: '1907', content: ['At the dramatic court session, Rouletabille takes the witness stand and reveals how the crime in the Yellow Room happened hours before the scream!'] },
      { id: 'myr-ch10', chapterNumber: 10, title: 'The Unmasking of Frédéric Larsan', wordCount: 940, readTimeMinutes: 5, publishedDate: '1907', content: ['Rouletabille points his finger across the courtroom: the master detective Frédéric Larsan IS the criminal Ballmeyer in disguise!'] }
    ]
  },

  {
    id: 'the-murders-in-the-rue-morgue',
    slug: 'the-murders-in-the-rue-morgue',
    title: 'The Murders in the Rue Morgue & Mystery Tales',
    synopsis: 'Edgar Allan Poe’s groundbreaking mysteries that birthed the detective genre. C. Auguste Dupin applies supreme analytical ratiocination in Paris to unravel impossible locked-room murders and stolen royal letters.',
    author: 'Edgar Allan Poe',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=800&q=80',
    coverAlt: 'A vintage Parisian alleyway shrouded in dark evening shadows.',
    status: 'Completed',
    genre: 'Mystery',
    tags: ['Public Domain', 'Poe', 'Dupin', 'Gothic Mystery', 'Paris', 'Classic'],
    totalChapters: 10,
    rating: 5,
    readsCount: 4670,
    isPublicDomain: true,
    chapters: [
      { id: 'rm-ch1', chapterNumber: 1, title: 'The Murders in the Rue Morgue: The Ratiocination of Dupin', wordCount: 880, readTimeMinutes: 4, publishedDate: '1841', content: ['In a secluded library in Paris, Dupin explains the analytical faculty that reads a friend’s silent thoughts through cobblestones and stereotomy.'] },
      { id: 'rm-ch2', chapterNumber: 2, title: 'The Horror on the Fourth Floor', wordCount: 870, readTimeMinutes: 4, publishedDate: '1841', content: ['Madame L’Espanaye and her daughter are found horribly slain on the fourth floor of the Rue Morgue. Witnesses describe two voices: one French, and one shrill, foreign tongue that none could recognize.'] },
      { id: 'rm-ch3', chapterNumber: 3, title: 'The Hidden Spring and the Nail', wordCount: 860, readTimeMinutes: 4, publishedDate: '1841', content: ['Dupin examines the back window sash, discovering a broken hidden spring and a headless nail that allowed the window to fasten itself automatically upon closing.'] },
      { id: 'rm-ch4', chapterNumber: 4, title: 'The Tuft of Tawny Hair', wordCount: 890, readTimeMinutes: 5, publishedDate: '1841', content: ['Examining the corpse’s fingers, Dupin discovers non-human tawny hairs and a throat impression matching no human hand: the creature from the Borneo jungles!'] },
      { id: 'rm-ch5', chapterNumber: 5, title: 'The Sailor’s Confession', wordCount: 910, readTimeMinutes: 5, publishedDate: '1841', content: ['A Maltese sailor answers Dupin’s advertisement, recounting how his escaped Ourang-Outang climbed the lightning-rod with a shaving razor.'] },
      { id: 'rm-ch6', chapterNumber: 6, title: 'The Mystery of Marie Rogêt: The Seine Mystery', wordCount: 860, readTimeMinutes: 4, publishedDate: '1842', content: ['Dupin analyzes the newspaper clippings surrounding the body of the beautiful cigar-girl found floating in the River Seine.'] },
      { id: 'rm-ch7', chapterNumber: 7, title: 'The Purloined Letter: The Prefect’s Dilemma', wordCount: 870, readTimeMinutes: 4, publishedDate: '1844', content: ['Prefect Monsieur G— of the Paris police searches Minister D—’s hotel with microscopes and needles for three months, unable to find the stolen royal letter.'] },
      { id: 'rm-ch8', chapterNumber: 8, title: 'Hidden in Plain Sight', wordCount: 880, readTimeMinutes: 4, publishedDate: '1844', content: ['Dupin visits the Minister wearing green spectacles, spotting the crumpled, soiled letter hanging carelessly in a pasteboard card-rack over the mantelpiece.'] },
      { id: 'rm-ch9', chapterNumber: 9, title: 'The Facsimile and the Vengeance', wordCount: 860, readTimeMinutes: 4, publishedDate: '1844', content: ['Dupin stages a street disturbance, swaps the letter for a prepared facsimile containing a poetic barb, and claims the fifty-thousand franc reward.'] },
      { id: 'rm-ch10', chapterNumber: 10, title: 'The Gold-Bug: The Cipher on Sullivan’s Island', wordCount: 920, readTimeMinutes: 5, publishedDate: '1843', content: ['William Legrand deciphers Captain Kidd’s secret cryptographic parchment using heat over a fire and drops the golden beetle through the skull’s eye to unearth the pirate treasure.'] }
    ]
  },

  {
    id: 'the-moonstone',
    slug: 'the-moonstone',
    title: 'The Moonstone',
    synopsis: 'Wilkie Collins’s pioneering Victorian detective novel. A priceless yellow diamond stolen from an Indian temple is gifted to Rachel Verinder on her birthday, vanishing from her dressing room that very night under the eyes of Sergeant Cuff.',
    author: 'Wilkie Collins',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
    coverAlt: 'A glowing gemstone casting mystical reflections on antique parchment.',
    status: 'Completed',
    genre: 'Mystery',
    tags: ['Public Domain', 'Diamond Heist', 'Sergeant Cuff', 'Victorian', 'Classic'],
    totalChapters: 10,
    rating: 5,
    readsCount: 4210,
    isPublicDomain: true,
    chapters: [
      { id: 'ms-ch1', chapterNumber: 1, title: 'The Storming of Seringapatam', wordCount: 840, readTimeMinutes: 4, publishedDate: '1868', content: ['The prologue describes the storming of the Indian palace in 1799, where Colonel Herncastle murders the Brahmin guards and steals the sacred yellow diamond.'] },
      { id: 'ms-ch2', chapterNumber: 2, title: 'Gabriel Betteredge and Robinson Crusoe', wordCount: 850, readTimeMinutes: 4, publishedDate: '1868', content: ['The faithful old house-steward Gabriel Betteredge consults his beloved Robinson Crusoe as an infallible oracle on life and household crises.'] },
      { id: 'ms-ch3', chapterNumber: 3, title: 'The Birthday Banquet', wordCount: 860, readTimeMinutes: 4, publishedDate: '1868', content: ['Franklin Blake brings the Moonstone to Rachel Verinder on her eighteenth birthday. She pins it to her white dress, dazzling all the dinner guests.'] },
      { id: 'ms-ch4', chapterNumber: 4, title: 'The Theft in the Night', wordCount: 880, readTimeMinutes: 4, publishedDate: '1868', content: ['In the morning, the diamond is gone from Rachel’s Indian cabinet. Rachel refuses to speak, locking herself in her room in cold, bitter silence.'] },
      { id: 'ms-ch5', chapterNumber: 5, title: 'Sergeant Cuff and the Rose Garden', wordCount: 890, readTimeMinutes: 5, publishedDate: '1868', content: ['The famous London detective Sergeant Cuff arrives, whistling "The Last Rose of Summer" and discovering a smear of wet paint on the dressing-room door.'] },
      { id: 'ms-ch6', chapterNumber: 6, title: 'The Tragedy of Rosanna Spearman', wordCount: 870, readTimeMinutes: 4, publishedDate: '1868', content: ['The tragic housemaid Rosanna Spearman hides a stained nightgown in the Shivering Sand and throws herself into the quicksand.'] },
      { id: 'ms-ch7', chapterNumber: 7, title: 'The Narrative of Miss Clack', wordCount: 850, readTimeMinutes: 4, publishedDate: '1868', content: ['The hypocritical, tract-distributing cousin Drusilla Clack describes the family’s move to London and the hypocrisies of Godfrey Ablewhite.'] },
      { id: 'ms-ch8', chapterNumber: 8, title: 'The Discovery of the Stained Nightgown', wordCount: 890, readTimeMinutes: 5, publishedDate: '1868', content: ['Franklin Blake dredges the tin box from the Shivering Sand, opening it to find the paint-stained nightgown with his own name embroidered on the collar!'] },
      { id: 'ms-ch9', chapterNumber: 9, title: 'The Opium Experiment', wordCount: 910, readTimeMinutes: 5, publishedDate: '1868', content: ['Dr. Ezra Jennings reconstructs the night: Franklin had taken laudanum for insomnia, sleepwalking into Rachel’s room to move the diamond for safety!'] },
      { id: 'ms-ch10', chapterNumber: 10, title: 'Restoration to the Temple', wordCount: 930, readTimeMinutes: 5, publishedDate: '1868', content: ['Godfrey Ablewhite is found smothered in a sailor’s boarding-house. The Brahmins carry the Moonstone back across the ocean to shine upon the forehead of the four-handed Indian god.'] }
    ]
  }
];
