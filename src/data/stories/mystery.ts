import type { Story } from '../stories';

export const mysteryBooks: Story[] = [
  {
    id: 'sherlock-holmes-scandal',
    slug: 'a-scandal-in-bohemia',
    title: 'A Scandal in Bohemia',
    synopsis: 'On a chill March evening beside the crackling fireplace of 221B Baker Street, Sherlock Holmes and Dr. Watson receive a masked royal visitor from Bohemia, leading Holmes into an intellectual duel with Irene Adler.',
    author: 'Arthur Conan Doyle',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80',
    coverAlt: 'A cozy Victorian mahogany library desk with an oil lamp and magnifying glass.',
    status: 'Completed',
    genre: 'Mystery',
    tags: ['Public Domain', 'Baker Street', 'Cozy Mystery', 'Sherlock Holmes', 'Classic'],
    totalChapters: 2,
    rating: 5,
    readsCount: 4320,
    isPublicDomain: true,
    chapters: [
      {
        id: 'sh-ch1',
        chapterNumber: 1,
        title: 'The Letter in Baker Street',
        wordCount: 840,
        readTimeMinutes: 4,
        publishedDate: '1891',
        authorNote: 'Rainy evening at 221B Baker Street.',
        content: [
          'To Sherlock Holmes she is always THE woman. I have seldom heard him mention her under any other name. In his eyes she eclipses and predominates the whole of her sex.',
          'One night—it was on the twentieth of March, 1888—I was returning from a journey to a patient, when my way led me through Baker Street. As I passed the well-remembered door, I looked up at the windows. A tall, thin figure passed twice across the blind.',
          'I rang the bell, and was shown up to the chamber which had formerly been in part my own. A fire was crackling pleasantly in the hearth, and on the table lay a sheet of thick, pink-tinted Bohemian notepaper beside his favorite briar pipe.'
        ]
      },
      {
        id: 'sh-ch2',
        chapterNumber: 2,
        title: 'The Masked Visitor',
        wordCount: 860,
        readTimeMinutes: 4,
        publishedDate: '1891',
        authorNote: 'The King of Bohemia enters in disguise.',
        content: [
          'A heavy step was heard upon the stair, and a man not less than six feet six inches in height, with the chest and limbs of a Hercules, stepped into the room. He wore a dark vizard mask covering the upper half of his face, and his chest was adorned with a heavy cloak lined with flame-colored silk.',
          '"You had my note?" he asked with a deep, harsh voice and a strongly marked German accent.',
          '"Pray take a seat," said Holmes. "This is my friend and colleague, Dr. Watson, who is occasionally good enough to help me in my cases. Whom ought I to address?"',
          '"You may address me as Count von Kramm, a Bohemian nobleman. But you must understand that the matter is of extreme delicacy, involving the honour of the royal house of Bohemia."'
        ]
      }
    ]
  },

  {
    id: 'hound-of-baskervilles',
    slug: 'the-hound-of-the-baskervilles',
    title: 'The Hound of the Baskervilles',
    synopsis: 'Sherlock Holmes and Dr. Watson investigate the curse of a spectral hound haunting the fog-drenched Dartmoor mires after the mysterious death of Sir Charles Baskerville.',
    author: 'Arthur Conan Doyle',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=800&q=80',
    coverAlt: 'A lantern shining into the dense moorland mist of Dartmoor at night.',
    status: 'Completed',
    genre: 'Mystery',
    tags: ['Public Domain', 'Dartmoor', 'Gothic Mystery', 'Sherlock Holmes', 'Atmospheric'],
    totalChapters: 3,
    rating: 5,
    readsCount: 5740,
    isPublicDomain: true,
    chapters: [
      {
        id: 'hob-ch1',
        chapterNumber: 1,
        title: 'Mr. Sherlock Holmes',
        wordCount: 820,
        readTimeMinutes: 4,
        publishedDate: '1902',
        authorNote: 'Examining the walking stick of Dr. Mortimer.',
        content: [
          'Mr. Sherlock Holmes, who was usually very late in the mornings, save upon those not infrequent occasions when he was up all night, was seated at the breakfast table. I stood upon the hearth-rug and picked up the stick which our visitor had left behind him the night before.',
          'It was a fine, thick piece of wood, bulbous-headed, of the sort which is known as a "Penang lawyer." Just under the head was a broad silver band, nearly an inch across. "To James Mortimer, M.R.C.S., from his friends of the C.C.H.," was engraved upon it.',
          '"Well, Watson, what do you make of it?" Holmes asked, his back turned to me.',
          '"How did you know what I was doing?" I cried. "I believe you have eyes in the back of your head!"',
          '"I have, at least, a well-polished, silver-plated coffee-pot in front of me," said he, laughing.'
        ]
      },
      {
        id: 'hob-ch2',
        chapterNumber: 2,
        title: 'The Curse of the Baskervilles',
        wordCount: 860,
        readTimeMinutes: 4,
        publishedDate: '1902',
        authorNote: 'Dr. Mortimer reads the 1742 manuscript of the hound.',
        content: [
          'Dr. Mortimer took an ancient manuscript from his breast-pocket. "It was entrusted to me by Sir Charles Baskerville before his sudden death on the yew alley three months ago."',
          'He unfolded the yellowed parchment and read in the quiet Baker Street room: "Know then that in the time of the Great Rebellion, Hugo of that name came upon a maiden across the moor. And when the hounds ran down into the grim hollow, there stood a foul thing, great and black, in shape like a hound, yet larger than any hound that ever mortal eye had rested upon."',
          'Watson shuddered. Holmes leaned forward, his fingers steepled in concentration.'
        ]
      },
      {
        id: 'hob-ch3',
        chapterNumber: 3,
        title: 'The Footprints of a Gigantic Hound',
        wordCount: 890,
        readTimeMinutes: 4,
        publishedDate: '1902',
        authorNote: 'The sinister footprints on the yew walk.',
        content: [
          '"Sir Charles lay at the far gate opening upon the moor," Mortimer continued in a hushed whisper. "There were no marks of violence upon him, but his face was contorted with an agony of dread."',
          '"Were there no other marks on the ground?" asked Holmes.',
          '"None."',
          '"Footprints?"',
          '"No footprints at all, Mr. Holmes, save one set twenty yards away on the soft gravel."',
          '"A man\'s or a woman\'s?"',
          'Dr. Mortimer looked at us for a moment with widened eyes, and his voice sank almost to a whisper:',
          '"Mr. Holmes, they were the footprints of a gigantic hound!"'
        ]
      }
    ]
  },

  {
    id: 'study-in-scarlet',
    slug: 'a-study-in-scarlet',
    title: 'A Study in Scarlet',
    synopsis: 'The landmark story where Dr. John Watson first meets the eccentric consulting detective Sherlock Holmes and shares lodgings at 221B Baker Street.',
    author: 'Arthur Conan Doyle',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80',
    coverAlt: 'A vintage chemical beaker and gas lamp in an old London laboratory.',
    status: 'Completed',
    genre: 'Mystery',
    tags: ['Public Domain', 'Origin Story', 'Sherlock Holmes', 'Watson', 'Classic'],
    totalChapters: 2,
    rating: 5,
    readsCount: 4610,
    isPublicDomain: true,
    chapters: [
      {
        id: 'sis-ch1',
        chapterNumber: 1,
        title: 'Mr. Sherlock Holmes',
        wordCount: 830,
        readTimeMinutes: 4,
        publishedDate: '1887',
        authorNote: 'Watson meets Holmes in the chemical laboratory of St. Bartholomew’s.',
        content: [
          'In the year 1878 I took my degree of Doctor of Medicine of the University of London, and proceeded to Netley to go through the course prescribed for surgeons in the army.',
          'Having returned to England with ruined health from the Afghan war, I was looking for cheap lodgings in London when an old acquaintance, young Stamford, met me at the Criterion Bar.',
          '"I know a fellow who is in the chemical laboratory at the hospital," Stamford said. "He is looking for someone to go halves with him in some rather nice rooms in Baker Street which he has found, but which are too expensive for his purse."',
          'We walked together to the hospital. Holmes was bent over a glass vial, crying: "I have found it! I have found a reagent which is precipitated by hemoglobin and by nothing else!"'
        ]
      },
      {
        id: 'sis-ch2',
        chapterNumber: 2,
        title: 'The Science of Deduction',
        wordCount: 860,
        readTimeMinutes: 4,
        publishedDate: '1887',
        authorNote: 'Holmes demonstrates his powers at the breakfast table.',
        content: [
          'We met next day and inspected the rooms at No. 221B Baker Street. They consisted of a couple of comfortable bed-rooms and a single large airy sitting-room, cheerfully furnished, and illuminated by two broad windows.',
          'As the weeks went by, my curiosity regarding his profession grew. One morning, he tossed an article across the table: "From a drop of water, a logician could infer the possibility of an Atlantic or a Niagara without having seen or heard of one or the other."',
          '"What ineffable twaddle!" I cried. "It is practically impossible!"',
          '"It is not impossible at all," smiled Holmes quietly. "For example, the moment I saw you at the hospital, I knew you had come from Afghanistan. The train of reasoning was instantaneous: here is a medical man, with an air of a military man, whose left arm is stiff and whose complexion is dark from the tropic sun. Where could an English surgeon have seen such hardship? Clearly in Afghanistan."'
        ]
      }
    ]
  },

  {
    id: 'sign-of-the-four',
    slug: 'the-sign-of-the-four',
    title: 'The Sign of the Four',
    synopsis: 'Mary Morstan consults Holmes regarding a mysterious pearl sent to her every year on the same date, leading into an expedition across foggy London rivers.',
    author: 'Arthur Conan Doyle',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80',
    coverAlt: 'A pearl necklace resting on black velvet in a candle-lit London study.',
    status: 'Completed',
    genre: 'Mystery',
    tags: ['Public Domain', 'Pearls', 'London Mist', 'Sherlock Holmes', 'Classic'],
    totalChapters: 2,
    rating: 5,
    readsCount: 4190,
    isPublicDomain: true,
    chapters: [
      {
        id: 'sof-ch1',
        chapterNumber: 1,
        title: 'Miss Morstan Enters',
        wordCount: 820,
        readTimeMinutes: 4,
        publishedDate: '1890',
        authorNote: 'The arrival of Mary Morstan at Baker Street.',
        content: [
          'Sherlock Holmes took his bottle from the corner of the mantel-piece and his hypodermic syringe from its neat morocco case. Three times a day for many months I had witnessed this performance, and my conscience began to rebel against my silence.',
          '"Which is it to-day?" I asked. "Morphine or cocaine?"',
          'He raised his eyes languidly from the old black-letter volume. "It is cocaine," he said. "A seven-per-cent solution. Would you care to try it?"',
          'Before I could launch into my protest, Mrs. Hudson knocked on the door. "A young lady to see you, sir. Miss Mary Morstan."',
          'Miss Morstan entered with a firm step and an outward composure. She was blonde, young, dainty, well gloved, and dressed in the most perfect taste of quiet gray cashmere.'
        ]
      },
      {
        id: 'sof-ch2',
        chapterNumber: 2,
        title: 'The Six Pearls',
        wordCount: 850,
        readTimeMinutes: 4,
        publishedDate: '1890',
        authorNote: 'Miss Morstan recounts the mysterious gifts.',
        content: [
          '"Six years ago," said Miss Morstan, "an advertisement appeared in the Times asking for the address of Miss Mary Morstan, stating that it would be to her advantage to come forward. By my employer\'s advice, I published my address."',
          '"Upon that very day there came to me through the post a small cardboard box containing a very large and lustrous pearl. No word was enclosed. And every year since, on that same day, there has always arrived a similar box with a similar pearl."',
          'She opened a flat box and showed us six of the finest pearls that I had ever seen, glowing with a milky, iridescent sheen. "And this morning, Mr. Holmes, came this letter: Be at the third pillar outside the Lyceum Theatre to-night at seven o\'clock. You are a wronged woman, and shall have justice."'
        ]
      }
    ]
  },

  {
    id: 'red-headed-league',
    slug: 'the-red-headed-league',
    title: 'The Red-Headed League',
    synopsis: 'A pawnbroker with fiery red hair is hired for an absurdly easy job copying the Encyclopædia Britannica, uncovering an audacious underground bank robbery scheme.',
    author: 'Arthur Conan Doyle',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80',
    coverAlt: 'Old leather-bound encyclopedia volumes open beside an ink bottle.',
    status: 'Completed',
    genre: 'Mystery',
    tags: ['Public Domain', 'Wit', 'Red Hair', 'Bank Vault', 'Classic'],
    totalChapters: 2,
    rating: 5,
    readsCount: 4320,
    isPublicDomain: true,
    chapters: [
      {
        id: 'rhl-ch1',
        chapterNumber: 1,
        title: 'A Singular Client',
        wordCount: 810,
        readTimeMinutes: 4,
        publishedDate: '1891',
        authorNote: 'Jabez Wilson visits 221B Baker Street.',
        content: [
          'I had called upon my friend, Mr. Sherlock Holmes, one day in the autumn of last year and found him in deep conversation with a very stout, florid-faced, elderly gentleman with fiery red hair.',
          'Holmes rose with a chuckle. "You could not have come at a better time, my dear Watson. This is Mr. Jabez Wilson, who has been good enough to call upon me this morning to relate a little narrative which bids fair to be one of the most singular that I have listened to for some time."',
          'The pawnbroker pulled a dirty copy of the Morning Chronicle from his overcoat and pointed to an advertisement:',
          '"TO THE RED-HEADED LEAGUE: On account of the bequest of the late Ezekiah Hopkins of Pennsylvania, there is now another vacancy open which entitles a member of the League to a salary of £4 a week for purely nominal services. All red-headed men who are sound in body and mind above the age of twenty-one years are eligible."'
        ]
      },
      {
        id: 'rhl-ch2',
        chapterNumber: 2,
        title: 'Copying the Encyclopædia',
        wordCount: 840,
        readTimeMinutes: 4,
        publishedDate: '1891',
        authorNote: 'The dissolution of the League and the dark cellar.',
        content: [
          '"For eight weeks," said Mr. Wilson, "I sat in the office from ten to two, copying out the Encyclopædia Britannica, beginning with the letter A. I had reached Attica and hope to reach B soon."',
          '"And then, when I went to the office this morning, the door was locked. Nailed to the center of the panel with a tack was a piece of cardboard: THE RED-HEADED LEAGUE IS DISSOLVED. October 9, 1890."',
          'Holmes sat back in his armchair and laughed until his sides ached. "A most refreshing little problem, Watson! And if I am not mistaken, tonight we shall be waiting in the dark vault of the City Bank to see who has been digging a tunnel beneath Mr. Wilson\'s shop!"'
        ]
      }
    ]
  },

  {
    id: 'father-brown-blue-cross',
    slug: 'the-blue-cross',
    title: 'The Blue Cross (Father Brown)',
    synopsis: 'Valentin, the head of the Paris police, tracks the brilliant thief Flambeau across London, following an absurd trail of overturned sugar bowls and soup on walls left by a quiet little Catholic priest.',
    author: 'G.K. Chesterton',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80',
    coverAlt: 'A silver cross resting on an ancient Bible in a quiet church alcove.',
    status: 'Completed',
    genre: 'Mystery',
    tags: ['Public Domain', 'Father Brown', 'Chesterton', 'London', 'Wit'],
    totalChapters: 2,
    rating: 5,
    readsCount: 3910,
    isPublicDomain: true,
    chapters: [
      {
        id: 'bc-ch1',
        chapterNumber: 1,
        title: 'The Trail of Absurdities',
        wordCount: 830,
        readTimeMinutes: 4,
        publishedDate: '1910',
        authorNote: 'Aristide Valentin pursues Flambeau through London.',
        content: [
          'Between the silver ribbon of morning and the green ribbon of evening, the great detective Valentin followed the great thief Flambeau through London.',
          'In a quiet tea shop, Valentin noticed that the salt was in the sugar cellar and the sugar in the salt cellar. "A funny little priest with a large umbrella was here," the waitress explained. "He threw his soup at the wallpaper before he left!"',
          'Valentin followed the trail of intentional blunders to Hampstead Heath, where beneath the starry trees two priests were arguing philosophy.'
        ]
      },
      {
        id: 'bc-ch2',
        chapterNumber: 2,
        title: 'Reason and Faith',
        wordCount: 860,
        readTimeMinutes: 4,
        publishedDate: '1910',
        authorNote: 'Father Brown unmasks the master criminal.',
        content: [
          'The taller priest leaned forward, his voice turning cold. "Give me that blue cross with the sapphires, Father Brown, or I will break you like a twig."',
          'The little priest blinked serenely through his spectacles. "I am sorry to disappoint you, Flambeau. But I knew you were not a true priest the moment you attacked reason. A true theologian never denies logic."',
          '"And as for the blue cross," Father Brown added mildly, "I posted it to my friend in Westminster two hours ago from that sweetshop where I tipped over the apples."'
        ]
      }
    ]
  },

  {
    id: 'father-brown-secret-garden',
    slug: 'the-secret-garden-mystery',
    title: 'The Secret Garden Mystery (Father Brown)',
    synopsis: 'A headless corpse is found in the walled garden of the Paris chief of police, where no stranger could have entered and no weapon can be found.',
    author: 'G.K. Chesterton',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80',
    coverAlt: 'A stone walled garden path bathed in moonlight.',
    status: 'Completed',
    genre: 'Mystery',
    tags: ['Public Domain', 'Father Brown', 'Locked Room', 'Paris', 'Classic'],
    totalChapters: 2,
    rating: 5,
    readsCount: 3740,
    isPublicDomain: true,
    chapters: [
      {
        id: 'sgm-ch1',
        chapterNumber: 1,
        title: 'Dinner at the Rue d\'Assas',
        wordCount: 820,
        readTimeMinutes: 4,
        publishedDate: '1910',
        authorNote: 'Aristide Valentin hosts a dinner behind impenetrable garden walls.',
        content: [
          'Aristide Valentin, Chief of the Paris Police, lived in a house in the Rue d\'Assas whose high garden was surrounded by formidable walls without any gate or entrance from the street.',
          'During an intimate dinner with distinguished guests—including an American millionaire and Lord Galloway—a scream shattered the quiet.',
          'In the wet gravel by the fountain lay the body of a man in evening dress, completely headless, while all doors and gates remained locked from the inside.'
        ]
      },
      {
        id: 'sgm-ch2',
        chapterNumber: 2,
        title: 'Father Brown\'s Deduction',
        wordCount: 840,
        readTimeMinutes: 4,
        publishedDate: '1910',
        authorNote: 'The little priest examines the two severed heads.',
        content: [
          'While the Parisian gendarmes searched the bushes for axes, Father Brown knelt in the grass with his umbrella tucked under his arm.',
          '"Has it occurred to anyone," the priest asked softly, "to notice that the head found over the wall belongs to a corpse that was executed three days ago in the guillotine, while the body on the grass is someone else entirely?"',
          'A gasp went through the circle as Father Brown unraveled the extraordinary drama of justice and obsession.'
        ]
      }
    ]
  },

  {
    id: 'rue-morgue',
    slug: 'the-murders-in-the-rue-morgue',
    title: 'The Murders in the Rue Morgue',
    synopsis: 'The foundational tale of modern detective fiction, featuring C. Auguste Dupin in Paris solving an impossible locked-room double murder on the fourth floor.',
    author: 'Edgar Allan Poe',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80',
    coverAlt: 'A dark Parisian alleyway with shuttered mansard windows at midnight.',
    status: 'Completed',
    genre: 'Mystery',
    tags: ['Public Domain', 'Poe', 'Dupin', 'Locked Room', 'Pioneer'],
    totalChapters: 2,
    rating: 5,
    readsCount: 4890,
    isPublicDomain: true,
    chapters: [
      {
        id: 'rm-ch1',
        chapterNumber: 1,
        title: 'The Analytical Mind',
        wordCount: 830,
        readTimeMinutes: 4,
        publishedDate: '1841',
        authorNote: 'Meeting Monsieur C. Auguste Dupin in Paris.',
        content: [
          'The mental features discoursed of as the analytical, are, in themselves, but little susceptible of analysis. We appreciate them only in their effects.',
          'Residing in Paris during the spring and part of the summer of 18—, I there became acquainted with a Monsieur C. Auguste Dupin. This young gentleman was of an excellent family, reduced to poverty by circumstances.',
          'Our seclusion was perfect. We admitted no visitors. It was a whimsical freak of my friend to be enamored of the Night for her own sake; and into this bizarrerie, as into all his others, I quietly fell.',
          'One morning, the Gazette des Tribunaux published an account of an extraordinary murder in the Rue Morgue, where shrieks had been heard on the fourth story of a house locked entirely from within.'
        ]
      },
      {
        id: 'rm-ch2',
        chapterNumber: 2,
        title: 'The Non-Human Voice',
        wordCount: 860,
        readTimeMinutes: 4,
        publishedDate: '1841',
        authorNote: 'Dupin analyzes the testimony of the witnesses.',
        content: [
          '"Notice the witnesses, my friend," said Dupin, tapping the newspaper. "The Frenchman thought the shrill voice was that of a Spaniard. The Dutchman swore it was French. The Englishman declared it to be German, and the Spaniard was confident it was English!"',
          '"Not one of these men recognized a single syllable of words," said Dupin, his eyes glowing in the candlelight. "Because the voice that cried out in that locked fourth-story chamber was not human at all."'
        ]
      }
    ]
  },

  {
    id: 'purloined-letter',
    slug: 'the-purloined-letter',
    title: 'The Purloined Letter',
    synopsis: 'A compromise-inducing royal letter is stolen by a minister, and the Parisian police tear apart his apartment in vain, until Dupin demonstrates that the best hiding place is in plain sight.',
    author: 'Edgar Allan Poe',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80',
    coverAlt: 'A card rack hanging above an antique mantelpiece with folded letters.',
    status: 'Completed',
    genre: 'Mystery',
    tags: ['Public Domain', 'Dupin', 'Poe', 'Psychology', 'Classic'],
    totalChapters: 2,
    rating: 5,
    readsCount: 4230,
    isPublicDomain: true,
    chapters: [
      {
        id: 'pl-ch1',
        chapterNumber: 1,
        title: 'The Prefect\'s Dilemma',
        wordCount: 810,
        readTimeMinutes: 4,
        publishedDate: '1844',
        authorNote: 'Monsieur G— visits Dupin in his dark library.',
        content: [
          'At Paris, just after dark one gusty evening in the autumn of 18—, I was enjoying the twofold luxury of meditation and a meerschaum, in company with my friend C. Auguste Dupin, in his little back library, or book-closet, au troisième, No. 33, Rue Dunôt, Faubourg St. Germain.',
          'For one hour at least we had maintained a profound silence; when the door of our apartment was thrown open, and admitted our old acquaintance, Monsieur G—, the Prefect of the Parisian police.',
          '"A very simple problem," said the Prefect, "yet it has puzzled us completely. A letter of the utmost political consequence has been stolen from the royal boudoir by Minister D—, and though we have searched his house with microscopes for three months, we cannot find it."'
        ]
      },
      {
        id: 'pl-ch2',
        chapterNumber: 2,
        title: 'In Plain Sight',
        wordCount: 840,
        readTimeMinutes: 4,
        publishedDate: '1844',
        authorNote: 'Dupin retrieves the letter from the card rack.',
        content: [
          '"The error of the police," explained Dupin, handing the letter to the bewildered Prefect, "lay in supposing that the Minister would conceal the document in some secret cavity behind wallpaper or inside a chair leg."',
          '"I called upon Minister D— wearing green spectacles to shield my eyes, and observed the room. There, dangling from a dirty blue ribbon right beneath the center of the mantelpiece, was a crumpled, torn envelope turned inside out."',
          '"It was exposed to the full view of every visitor. The most profound concealment, my dear Watson, is that which is left completely open."'
        ]
      }
    ]
  },

  {
    id: 'arsene-lupin-burglar',
    slug: 'arsene-lupin-gentleman-burglar',
    title: 'Arsène Lupin, Gentleman Burglar',
    synopsis: 'The charming, witty French master of disguise and gentleman thief conducts audacious heists aboard luxury transatlantic liners and through high Parisian salons.',
    author: 'Maurice Leblanc',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80',
    coverAlt: 'A silk top hat and silver-tipped cane resting on an antique mahogany table.',
    status: 'Completed',
    genre: 'Mystery',
    tags: ['Public Domain', 'Arsène Lupin', 'Gentleman Thief', 'Paris', 'Wit'],
    totalChapters: 2,
    rating: 5,
    readsCount: 4620,
    isPublicDomain: true,
    chapters: [
      {
        id: 'al-ch1',
        chapterNumber: 1,
        title: 'The Arrest of Arsène Lupin',
        wordCount: 830,
        readTimeMinutes: 4,
        publishedDate: '1907',
        authorNote: 'A telegraph flashes across the transatlantic steamer La Provence.',
        content: [
          'It was a strange voyage! It had commenced so well, and the transatlantic liner La Provence was swift and comfortable. But on the second day out, the wireless telegraph sparked a message that electrified the passengers:',
          '"Arsène Lupin is on board your vessel, traveling in first class. He is traveling under the name of R—."',
          'A sudden squall of anxiety swept the saloon. Every man whose name began with R was eyed with profound suspicion, while the jewels of the American millionaires were double-locked in the purser\'s safe.',
          'And yet, on the fourth night, the safe was opened and the jewels vanished without a trace!'
        ]
      },
      {
        id: 'al-ch2',
        chapterNumber: 2,
        title: 'The Escape',
        wordCount: 850,
        readTimeMinutes: 4,
        publishedDate: '1907',
        authorNote: 'Lupin announces his escape from the Prison de la Santé.',
        content: [
          'Arsène Lupin was locked in cell fourteen of the Santé prison, guarded day and night by twelve warders. And yet, every morning the Paris papers published his personal notes.',
          '"I shall not attend my trial," Lupin wrote courteously to the examining magistrate. "I have an engagement in the country that afternoon, and will leave prison next Wednesday."',
          'The Governor doubled the guards and inspected the iron bars three times a day. But when Wednesday morning arrived, cell fourteen was empty, leaving behind only a bouquet of violets and a card of thanks.'
        ]
      }
    ]
  },

  {
    id: 'mystery-yellow-room',
    slug: 'the-mystery-of-the-yellow-room',
    title: 'The Mystery of the Yellow Room',
    synopsis: 'Young reporter Joseph Rouletabille investigates the ultimate locked-room puzzle at the Château du Glandier, where an attack occurs inside a room locked from within with iron shutters and barred doors.',
    author: 'Gaston Leroux',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80',
    coverAlt: 'A vintage French château shrouded in autumn mist.',
    status: 'Completed',
    genre: 'Mystery',
    tags: ['Public Domain', 'Locked Room', 'Rouletabille', 'French Mystery', 'Classic'],
    totalChapters: 2,
    rating: 5,
    readsCount: 3820,
    isPublicDomain: true,
    chapters: [
      {
        id: 'myr-ch1',
        chapterNumber: 1,
        title: 'The Insoluble Problem',
        wordCount: 820,
        readTimeMinutes: 4,
        publishedDate: '1907',
        authorNote: 'The Yellow Room at the Château du Glandier.',
        content: [
          'It is not without a certain emotion that I begin to recount here the extraordinary adventures of Joseph Rouletabille.',
          'The Yellow Room was a small bedchamber at the end of the pavilion in the park of the Château du Glandier. It had only one door, opening into the laboratory, and one window, heavily barred with solid iron grating.',
          'At midnight, Mademoiselle Stangerson screamed "Murder!" Guns were fired within. Her father and the servants battered down the heavy oak door. They found the young woman bleeding on the floor, the furniture overturned—and the room completely empty!',
          'There was no chimney, no trapdoor, no secret panel. How had the assassin entered, and how on earth had he vanished?'
        ]
      },
      {
        id: 'myr-ch2',
        chapterNumber: 2,
        title: 'The Reasoning of Rouletabille',
        wordCount: 840,
        readTimeMinutes: 4,
        publishedDate: '1907',
        authorNote: 'Rouletabille follows the two good ends of his reason.',
        content: [
          'Joseph Rouletabille, only eighteen years old, knelt upon the parquet floor with his notebook. While the great detective Frédéric Larsan looked for footprints and ladder marks, Rouletabille tapped his forehead.',
          '"You must take reason by the right end," said Rouletabille with a cheerful smile. "If the assassin could not escape from the Yellow Room after the door was broken open, then he must have left before the door was locked!"'
        ]
      }
    ]
  },

  {
    id: 'the-moonstone',
    slug: 'the-moonstone',
    title: 'The Moonstone',
    synopsis: 'Regarded by T.S. Eliot as the first and finest English detective novel, recounting the theft of a priceless, cursed yellow diamond from an English country house.',
    author: 'Wilkie Collins',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80',
    coverAlt: 'A glowing yellow diamond resting on an English country mansion desk.',
    status: 'Completed',
    genre: 'Mystery',
    tags: ['Public Domain', 'Wilkie Collins', 'Diamond', 'Sergeant Cuff', 'Foundational'],
    totalChapters: 2,
    rating: 5,
    readsCount: 4120,
    isPublicDomain: true,
    chapters: [
      {
        id: 'ms-ch1',
        chapterNumber: 1,
        title: 'The Diamond in the Night',
        wordCount: 820,
        readTimeMinutes: 4,
        publishedDate: '1868',
        authorNote: 'Gabriel Betteredge describes the birthday dinner of Miss Rachel.',
        content: [
          'I, Gabriel Betteredge, old house-steward in the family of Lady Verinder, have been requested to write down what I saw with my own eyes concerning the disappearance of the Moonstone.',
          'It was a famous yellow diamond, stolen from the forehead of a four-handed Hindu god at Seringapatam. When it was presented to Miss Rachel Verinder on her eighteenth birthday, it shone on her white silk bodice like a small moon.',
          'That night, Rachel locked the jewel in her Indian cabinet in her boudoir. But when morning came, the cabinet was open, and the Moonstone was gone!'
        ]
      },
      {
        id: 'ms-ch2',
        chapterNumber: 2,
        title: 'Sergeant Cuff and the Rose Garden',
        wordCount: 850,
        readTimeMinutes: 4,
        publishedDate: '1868',
        authorNote: 'The famous detective who cared more for roses than suspects.',
        content: [
          'A fly drove up to the door, and out stepped Sergeant Cuff of Scotland Yard: a grizzled, elderly man with a face as melancholy and sharp as a carving knife.',
          'His first act on arriving at the crime scene was not to examine the door locks, but to walk into the garden and admire the white moss-roses.',
          '"Grass is a deceitful thing, Mr. Betteredge," said the Sergeant calmly, snipping a dead leaf. "And so are human witnesses. But a smear of wet paint on a petticoat never lies."'
        ]
      }
    ]
  }
];
