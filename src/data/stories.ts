import { CHILDREN_OF_MU_FULL_CHAPTERS } from './childrenOfMuFullText';

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

export type StoryGenre =
  | 'All Classics'
  | 'Classic Literature'
  | 'Cozy Fantasy'
  | 'Mystery & Detective'
  | 'Adventure & Sci-Fi'
  | 'Study Materials & Philosophy';

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
  genre: StoryGenre;
  tags: string[];
  totalChapters: number;
  chapters: StoryChapter[];
  rating: number; // 1 to 5 teacups
  readsCount?: number;
  isPublicDomain?: boolean;
  gutenbergId?: number;
  isLiveGutenberg?: boolean;
  isPinned?: boolean;
  isPdfEbook?: boolean;
  pdfUrl?: string;
  pageCount?: number;
}

export const storyGenres = [
  'All',
  'Classic Literature',
  'Cozy Fantasy',
  'Mystery & Detective',
  'Adventure & Sci-Fi',
  'Study Materials & Philosophy',
] as const;

export const CHILDREN_OF_MU_STORY: Story = {
  id: 'the-children-of-mu',
  slug: 'the-children-of-mu',
  title: 'The Children of Mu',
  synopsis:
    'The legendary 1931 unabridged classic by British explorer James Churchward. Complete 290-page original edition investigating the lost Pacific continent of Mu, primeval human migrations, sacred Naacal stone tablets, and the forgotten prehistoric mother civilization.',
  author: 'James Churchward',
  authorRole: 'British Archaeologist & Explorer (1851–1936)',
  coverImage:
    'https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/covers/the-children-of-mu-cover.jpg',
  coverAlt: 'Antique leather-bound edition cover for The Children of Mu by James Churchward',
  status: 'Completed',
  genre: 'Adventure & Sci-Fi',
  tags: [
    'Pinned eBook',
    'Unabridged PDF',
    'Lost Continent of Mu',
    'Ancient Civilizations',
    'Sacred Tablets',
    'Public Domain',
  ],
  totalChapters: CHILDREN_OF_MU_FULL_CHAPTERS.length,
  rating: 5,
  readsCount: 148500,
  isPublicDomain: true,
  isPinned: true,
  isPdfEbook: true,
  pdfUrl:
    'https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/ebooks/childrenofmu0000chur.pdf',
  pageCount: 300,
  chapters: CHILDREN_OF_MU_FULL_CHAPTERS,
};

// Curated Classic Stories
export const THE_SECRET_GARDEN_STORY: Story = {
  id: 'the-secret-garden-sanctuary',
  slug: 'the-secret-garden-sanctuary',
  title: 'The Secret Garden',
  synopsis:
    'Frances Hodgson Burnett’s timeless masterpiece of renewal, nature, and healing. Ten-year-old Mary Lennox arrives at Misselthwaite Manor on the gloomy Yorkshire moors and discovers a forgotten, walled-in rose garden waiting to bloom.',
  author: 'Frances Hodgson Burnett',
  authorRole: 'English-American Novelist (1849–1924)',
  coverImage:
    'https://www.gutenberg.org/cache/epub/113/pg113.cover.medium.jpg',
  coverAlt: 'Victorian edition cover for The Secret Garden',
  status: 'Completed',
  genre: 'Classic Literature',
  tags: ['Nature & Gardens', 'Healing & Growth', 'Yorkshire Moors', 'Heartwarming Classic'],
  totalChapters: 3,
  rating: 5,
  readsCount: 89400,
  isPublicDomain: true,
  chapters: [
    {
      id: 'sg-ch-1',
      chapterNumber: 1,
      title: 'Chapter 1: There Is No One Left',
      wordCount: 1420,
      readTimeMinutes: 7,
      publishedDate: '1911 Unabridged Edition',
      authorNote: 'The opening atmosphere of Misselthwaite Manor and the distant cry on the Yorkshire moor.',
      content: [
        'When Mary Lennox was sent to Manor to live with her uncle, everybody said she was the most disagreeable-looking child ever seen. It was true, too. She had a little thin face and a little thin body, thin light hair and a sour expression.',
        'Her hair was yellow, and her face was yellow because she had been born in India and had always been ill in one way or another. Her father had held an appointment under the English Government and had always been busy and ill himself, and her mother had been a great beauty who cared only to go to parties and amuse herself with gay people.',
        'She had not wanted a little girl at all, and when Mary was born she handed her over to the care of an Ayah, who was made to understand that if she wished to please the Memsahib she must keep the child out of sight as much as possible.',
        'So when she was a sickly, fretting, ugly little baby she was kept out of the way, and when she became a sickly, fretful, toddling thing she was kept out of the way also. She never remembered seeing familiarly anything but the dark faces of her Ayah and the other native servants, and as they always obeyed her and gave her her own way in everything, by the time she was six years old she was as tyrannical and selfish a little pig as ever lived.',
        'It was in that strange and sudden way that Mary found out that she had neither father nor mother left, that they had died and been carried away in the night, and that the few native servants who had not died also had fled. The house was as still as the grave.',
      ],
    },
    {
      id: 'sg-ch-2',
      chapterNumber: 2,
      title: 'Chapter 2: Mistress Mary Quite Contrary',
      wordCount: 1650,
      readTimeMinutes: 8,
      publishedDate: '1911 Unabridged Edition',
      content: [
        'Mary made the long voyage to England in the care of an officer’s wife, who was taking her children to leave them in a boarding school. She was very much absorbed in her own little affairs and was very glad when they landed in London.',
        'Mrs. Medlock was a stout woman with very red cheeks and sharp black eyes. She wore a very purple dress, a black silk mantle with jet fringe on it, and a black bonnet with purple velvet flowers which stuck up and trembled when she moved her head.',
        '“A hundred rooms, nearly, but most of them shut up and locked,” Mrs. Medlock said as the carriage rolled across the dark moor. “And there’s a big park around it, and gardens with old trees with branches trailing to the ground.”',
        'Mary listened with her lips pressed together. She had never heard of a house with a hundred locked rooms before. It sounded mysterious and lonely, like a palace in a fairy tale where everyone had fallen asleep.',
        'The rain poured against the carriage windows, and outside lay the vast, dark emptiness of the moor, whispering with the autumn wind.',
      ],
    },
    {
      id: 'sg-ch-3',
      chapterNumber: 3,
      title: 'Chapter 3: Across the Heather Moors',
      wordCount: 1580,
      readTimeMinutes: 8,
      publishedDate: '1911 Unabridged Edition',
      content: [
        'The carriage lamps cast yellow funnels of light against the road, which seemed to Mary to be cut through dark heather bushes and gorse. The wind was blowing down from the hills in long, sweeping rushes that sounded like the waves of an inland sea.',
        '“What is a moor?” Mary asked abruptly, looking out into the ink-black night.',
        '“It’s just miles and miles and miles of wild land that nothing grows on but heather and gorse and broom, and nothing lives on but wild ponies and sheep,” Mrs. Medlock replied.',
        '“It sounds like the sea,” Mary murmured to herself. “The wild sea when the storm is rising.”',
        'And far off through the wet darkness, the heavy stone silhouette of Misselthwaite Manor stood waiting, with secret locked gardens hidden behind ivy-covered brick walls.',
      ],
    },
  ],
};

export const ALICE_IN_WONDERLAND_STORY: Story = {
  id: 'alices-adventures-in-wonderland-curated',
  slug: 'alices-adventures-in-wonderland-curated',
  title: 'Alice’s Adventures in Wonderland',
  synopsis:
    'Lewis Carroll’s beloved whimsical fantasy. Tumble down the rabbit-hole into an enchanting world of pocket-watch-checking White Rabbits, curious potions, the Cheshire Cat, and tea parties where it is always six o’clock.',
  author: 'Lewis Carroll',
  authorRole: 'English Author & Mathematician (1832–1898)',
  coverImage:
    'https://www.gutenberg.org/cache/epub/11/pg11.cover.medium.jpg',
  coverAlt: 'Original John Tenniel illustrated cover for Alice in Wonderland',
  status: 'Completed',
  genre: 'Cozy Fantasy',
  tags: ['Whimsical Fantasy', 'White Rabbit', 'Curiouser & Curiouser', 'Mad Tea-Party'],
  totalChapters: 2,
  rating: 5,
  readsCount: 112300,
  isPublicDomain: true,
  chapters: [
    {
      id: 'alice-ch-1',
      chapterNumber: 1,
      title: 'Chapter I: Down the Rabbit-Hole',
      wordCount: 2050,
      readTimeMinutes: 10,
      publishedDate: '1865 Macmillan Edition',
      authorNote: 'The legendary rabbit-hole descent beneath the sunny riverbank.',
      content: [
        'Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, “and what is the use of a book,” thought Alice “without pictures or conversations?”',
        'So she was considering in her own mind (as well as she could, for the hot day made her feel very sleepy and stupid), whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her.',
        'There was nothing so very remarkable in that; nor did Alice think it so very much out of the way to hear the Rabbit say to itself, “Oh dear! Oh dear! I shall be late!” (when she thought it over afterwards, it occurred to her that she ought to have wondered at this, but at the time it all seemed quite natural); but when the Rabbit actually took a watch out of its waistcoat-pocket, and looked at it, and then hurried on, Alice started to her feet, for it flashed across her mind that she had never before seen a rabbit with either a waistcoat-pocket, or a watch to take out of it.',
        'Burning with curiosity, she ran across the field after it, and fortunately was just in time to see it pop down a large rabbit-hole under the hedge.',
        'In another moment down went Alice after it, never once considering in the world how she was to get out again. The rabbit-hole went straight on like a tunnel for some way, and then dipped suddenly down, so suddenly that Alice had not a moment to think about stopping herself before she found herself falling down a very deep well.',
      ],
    },
    {
      id: 'alice-ch-2',
      chapterNumber: 2,
      title: 'Chapter II: The Pool of Tears',
      wordCount: 1840,
      readTimeMinutes: 9,
      publishedDate: '1865 Macmillan Edition',
      content: [
        '“Curiouser and curiouser!” cried Alice (she was so much surprised, that for the moment she quite forgot how to speak good English); “now I’m opening out like the largest telescope that ever was! Good-bye, feet!”',
        'For when she looked down at her feet, they seemed to be almost out of sight, they were getting so far off. “Oh, my poor little feet, I wonder who will put on your shoes and stockings for you now, dears? I’m sure I shan’t be able!”',
        'Just at this moment her head struck against the roof of the hall: in fact she was now more than nine feet high, and she at once took up the little golden key and hurried off to the garden door.',
        'Poor Alice! It was as much as she could do, lying down on one side, to look through into the garden with one eye; but to get through was more hopeless than ever: she sat down and began to cry again.',
        '“You ought to be ashamed of yourself,” said Alice, “a great girl like you, to go on crying in this way! Stop this moment, I tell you!” But she went on all the same, shedding gallons of tears, until there was a large pool all round her, about four inches deep and reaching half down the hall.',
      ],
    },
  ],
};

export const SHERLOCK_HOLMES_SCANDAL_STORY: Story = {
  id: 'sherlock-holmes-scandal-bohemia',
  slug: 'sherlock-holmes-scandal-bohemia',
  title: 'The Adventures of Sherlock Holmes',
  synopsis:
    'Sir Arthur Conan Doyle’s quintessential detective stories set in foggy Victorian London. Join Dr. John Watson at 221B Baker Street as Sherlock Holmes matches wits with the singular Irene Adler in A Scandal in Bohemia.',
  author: 'Sir Arthur Conan Doyle',
  authorRole: 'Scottish Author & Physician (1859–1930)',
  coverImage:
    'https://www.gutenberg.org/cache/epub/1661/pg1661.cover.medium.jpg',
  coverAlt: 'Sidney Paget illustrated cover for The Adventures of Sherlock Holmes',
  status: 'Completed',
  genre: 'Mystery & Detective',
  tags: ['221B Baker Street', 'Victorian London', 'Master of Deduction', 'Irene Adler'],
  totalChapters: 2,
  rating: 5,
  readsCount: 134200,
  isPublicDomain: true,
  chapters: [
    {
      id: 'sh-ch-1',
      chapterNumber: 1,
      title: 'I: A Scandal in Bohemia - Part 1',
      wordCount: 2200,
      readTimeMinutes: 11,
      publishedDate: '1891 Strand Magazine',
      authorNote: 'To Sherlock Holmes she is always THE woman. I have seldom heard him mention her under any other name.',
      content: [
        'To Sherlock Holmes she is always THE woman. I have seldom heard him mention her under any other name. In his eyes she eclipses and predominates the whole of her sex. It was not that he felt any emotion akin to love for Irene Adler. All emotions, and that one particularly, were abhorrent to his cold, precise but admirably balanced mind.',
        'I had seen little of Holmes lately. My marriage had drifted us away from each other. My own complete happiness, and the home-centred interests which rise up around the man who first finds himself master of his own establishment, were sufficient to absorb all my attention, while Holmes, who loathed every form of society with his whole Bohemian soul, remained in our lodgings in Baker Street, buried among his old books, and alternating from week to week between cocaine and ambition, the drowsiness of the drug, and the fierce energy of his own keen nature.',
        'He was still, as ever, deeply attracted by the study of crime, and occupied his immense faculties and extraordinary powers of observation in following out those clues, and clearing up those mysteries which had been abandoned as hopeless by the official police.',
        'One night—it was on the twentieth of March, 1888—I was returning from a journey to a patient (for I had now returned to civil practice), when my way led me through Baker Street. As I passed the well-remembered door, which must always be associated in my mind with my wooing, and with the dark incidents of the Study in Scarlet, I was seized with a keen desire to see Holmes again, and to know how he was employing his extraordinary powers.',
        'His rooms were brilliantly lit, and, even as I looked up, I saw his tall, spare figure pass twice in a dark silhouette against the blind. He was pacing the room swiftly, eagerly, with his head sunk upon his chest and his hands clasped behind him. To me, who knew his every mood and habit, his attitude and manner told their own story. He was at work again.',
      ],
    },
    {
      id: 'sh-ch-2',
      chapterNumber: 2,
      title: 'II: The Red-Headed League',
      wordCount: 1980,
      readTimeMinutes: 10,
      publishedDate: '1891 Strand Magazine',
      content: [
        'I had called upon my friend, Mr. Sherlock Holmes, one day in the autumn of last year and found him in deep conversation with a very stout, florid-faced, elderly gentleman with fiery red hair.',
        'With an apology for my intrusion, I was about to withdraw when Holmes pulled me abruptly into the room and closed the door behind me.',
        '“You could not possibly have come at a better time, my dear Watson,” he said cordially.',
        '“I was afraid that you were engaged.”',
        '“So I am. Very much so.”',
        '“Then I can wait in the next room.”',
        '“Not at all. This gentleman, Mr. Wilson, has been my partner and helper in many of my most successful cases, and I have no doubt that he will be of the utmost use to me in yours also.”',
        'The stout gentleman rose from his chair and gave a bob of greeting, with a quick little questioning glance from his small, fat-encircled eyes.',
      ],
    },
  ],
};

export const THE_GIFT_OF_THE_MAGI_STORY: Story = {
  id: 'the-gift-of-the-magi-sanctuary',
  slug: 'the-gift-of-the-magi-sanctuary',
  title: 'The Gift of the Magi',
  synopsis:
    'O. Henry’s quintessential heartwarming story of selfless love and Christmas devotion in a modest New York flat. Della and Jim each sacrifice their most prized possession to give the other an unforgettable gift.',
  author: 'O. Henry (William Sydney Porter)',
  authorRole: 'American Short Story Master (1862–1910)',
  coverImage:
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80',
  coverAlt: 'Cozy antique holiday book and warm tea',
  status: 'Completed',
  genre: 'Classic Literature',
  tags: ['Heartwarming', 'Love & Sacrifice', 'Holiday Classic', 'Short Story'],
  totalChapters: 1,
  rating: 5,
  readsCount: 65200,
  isPublicDomain: true,
  chapters: [
    {
      id: 'magi-ch-1',
      chapterNumber: 1,
      title: 'The Gift of the Magi',
      wordCount: 2060,
      readTimeMinutes: 10,
      publishedDate: '1905 New York World',
      authorNote: 'The magi, as you know, were wise men—wonderfully wise men—who brought gifts to the Babe in the manger.',
      content: [
        'One dollar and eighty-seven cents. That was all. And sixty cents of it was in pennies. Pennies saved one and two at a time by bulldozing the grocer and the vegetable man and the butcher until one’s cheeks burned with the silent imputation of parsimony that such close dealing implied. Three times Della counted it. One dollar and eighty-seven cents. And the next day would be Christmas.',
        'There was clearly nothing to do but flop down on the shabby little couch and howl. So Della did it. Which instigates the moral reflection that life is made up of sobs, sniffles, and smiles, with sniffles predominating.',
        'While the mistress of the home is gradually subsiding from the first stage to the second, take a look at the home. A furnished flat at $8 per week. It did not exactly beggar description, but it certainly had that word on the lookout for the mendicancy squad.',
        'Now, there were two possessions of the James Dillingham Youngs in which they both took a mighty pride. One was Jim’s gold watch that had been his father’s and his grandfather’s. The other was Della’s hair.',
        'Had the Queen of Sheba lived in the flat across the airshaft, Della would have let her hair hang out the window some day to dry just to depreciate Her Majesty’s jewels and gifts. Had King Solomon been the janitor, with all his treasures piled up in the basement, Jim would have pulled out his watch every time he passed, just to see him pluck at his beard from envy.',
        'So now Della’s beautiful hair fell about her rippling and shining like a cascade of brown waters. It reached below her knee and made itself almost a garment for her. And then she did it up again nervously and quickly. Once she faltered for a minute and stood still while a tear or two splashed on the worn red carpet.',
        'On went her old brown jacket; on went her old brown hat. With a whirl of skirts and with the brilliant sparkle still in her eyes, she fluttered out the door and down the stairs to the street.',
      ],
    },
  ],
};

export const THE_ART_OF_WAR_STORY: Story = {
  id: 'the-art-of-war-sun-tzu-sanctuary',
  slug: 'the-art-of-war-sun-tzu-sanctuary',
  title: 'The Art of War',
  synopsis:
    'The ancient military and philosophical treatise by General Sun Tzu, translated with introduction and notes by Lionel Giles. Essential insights on strategy, composure, knowing oneself, and peaceful victory.',
  author: 'Sun Tzu',
  authorRole: 'Ancient Chinese Strategist & Philosopher (544–496 BC)',
  coverImage:
    'https://www.gutenberg.org/cache/epub/132/pg132.cover.medium.jpg',
  coverAlt: 'Classic calligraphy edition of The Art of War',
  status: 'Completed',
  genre: 'Study Materials & Philosophy',
  tags: ['Philosophy', 'Strategy & Mindset', 'Ancient Wisdom', 'Unabridged Giles Translation'],
  totalChapters: 3,
  rating: 5,
  readsCount: 164000,
  isPublicDomain: true,
  chapters: [
    {
      id: 'aow-ch-1',
      chapterNumber: 1,
      title: 'Chapter I: Laying Plans',
      wordCount: 1450,
      readTimeMinutes: 7,
      publishedDate: 'Lionel Giles Unabridged Translation',
      authorNote: 'The moral law causes the people to be in complete accord with their ruler.',
      content: [
        'Sun Tzu said: The art of war is of vital importance to the State. It is a matter of life and death, a road either to safety or to ruin. Hence it is a subject of inquiry which can on no account be neglected.',
        'The art of war, then, is governed by five constant factors, to be taken into account in one’s deliberations, when seeking to determine the conditions obtaining in the field.',
        'These are: (1) The Moral Law; (2) Heaven; (3) Earth; (4) The Commander; (5) Method and discipline.',
        'The Moral Law causes the people to be in complete accord with their ruler, so that they will follow him regardless of their lives, undismayed by any danger.',
        'Heaven signifies night and day, cold and heat, times and seasons. Earth comprises distances, great and small; danger and security; open ground and narrow passes; the chances of life and death.',
        'The Commander stands for the virtues of wisdom, sincerely, benevolence, strictness and courage.',
        'All warfare is based on deception. Hence, when able to attack, we must seem unable; when using our forces, we must seem inactive; when we are near, we must make the enemy believe we are far away; when far away, we must make him believe we are near.',
      ],
    },
    {
      id: 'aow-ch-2',
      chapterNumber: 2,
      title: 'Chapter II: Waging War',
      wordCount: 1320,
      readTimeMinutes: 6,
      publishedDate: 'Lionel Giles Unabridged Translation',
      content: [
        'Sun Tzu said: In the operations of war, where there are in the field a thousand swift chariots, as many heavy chariots, and a hundred thousand mail-clad soldiers, with provisions enough to carry them a thousand li, the expenditure at home and at the front will reach the sum of a thousand ounces of silver a day.',
        'When you engage in actual fighting, if victory is long in coming, then men’s weapons will grow dull and their ardor will be damped. If you lay siege to a town, you will exhaust your strength.',
        'Again, if the campaign is protracted, the resources of the State will not be equal to the strain.',
        'Now, when your weapons are dulled, your ardor damped, your strength exhausted and your treasure spent, other chieftains will spring up to take advantage of your extremity. Then no man, however wise, will be able to avert the consequences that must ensue.',
        'Thus, though we have heard of stupid haste in war, cleverness has never been seen associated with long delays. There is no instance of a country having benefited from prolonged warfare.',
      ],
    },
    {
      id: 'aow-ch-3',
      chapterNumber: 3,
      title: 'Chapter III: Attack by Stratagem',
      wordCount: 1600,
      readTimeMinutes: 8,
      publishedDate: 'Lionel Giles Unabridged Translation',
      content: [
        'Sun Tzu said: In the practical art of war, the best thing of all is to take the enemy’s country whole and intact; to shatter and destroy it is not so good. So, too, it is better to recapture an army entire than to destroy it.',
        'Hence to fight and conquer in all your battles is not supreme excellence; supreme excellence consists in breaking the enemy’s resistance without fighting.',
        'Thus the highest form of generalship is to balk the enemy’s plans; the next best is to prevent the junction of the enemy’s forces; the next in order is to attack the enemy’s army in the field; and the worst policy of all is to besiege walled cities.',
        'Therefore the skillful leader subdues the enemy’s troops without any fighting; he captures their cities without laying siege to them; he overthrows their kingdom without lengthy operations in the field.',
        'If you know the enemy and know yourself, you need not fear the result of a hundred battles. If you know yourself but not the enemy, for every victory gained you will also suffer a defeat. If you know neither the enemy nor yourself, you will succumb in every battle.',
      ],
    },
  ],
};

// Initial Library with "The Children of Mu" pinned as #1 plus premier curated classics
export const stories: Story[] = [
  CHILDREN_OF_MU_STORY,
  THE_SECRET_GARDEN_STORY,
  ALICE_IN_WONDERLAND_STORY,
  SHERLOCK_HOLMES_SCANDAL_STORY,
  THE_GIFT_OF_THE_MAGI_STORY,
  THE_ART_OF_WAR_STORY,
];

export const INITIAL_STORIES = stories;


