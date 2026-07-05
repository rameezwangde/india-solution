import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  BriefcaseBusiness,
  Cake,
  CheckCircle2,
  ChevronRight,
  Gem,
  Gift,
  Heart,
  House,
  Mail,
  Megaphone,
  Music,
  PanelsTopLeft,
  PartyPopper,
  Sparkles,
  Trophy,
  Utensils,
} from 'lucide-react';
import { fadeUp, staggerContainer } from '../utils/animations';
import {
  findServiceBySlug,
  findServiceItemBySlug,
  serviceCatalog,
  slugifyServiceItem,
} from '../data/serviceCatalog';

const iconMap = {
  BriefcaseBusiness,
  Cake,
  Gem,
  Gift,
  Heart,
  House,
  Megaphone,
  Music,
  PanelsTopLeft,
  PartyPopper,
  Sparkles,
  Trophy,
  Utensils,
};

const invitationSections = [
  {
    eyebrow: 'Custom Designs',
    title: 'Invitations & Stationery',
    accent: 'Stationery',
    description: (
      <>
        Make your event unforgettable with our <strong>Invitation & Stationery Services</strong>, offering customized, high-quality invitations and stationery to match your unique style. From <strong>luxury invitations</strong> to <strong>RSVP cards, thank-you notes, and event signage</strong>, we ensure every detail is perfect. Our expert designers work closely with you to create personalized designs for <strong>corporate events, personal celebrations</strong>, and more. Let us set the tone for your event with stunning custom stationery that leaves a lasting impression
      </>
    ),
    items: [
      'Luxury Foil-Stamped Invitations',
      'Laser-Cut Invitations',
      'Vintage Letterpress Invitations',
      'Modern Minimalist Invitations',
      'Floral Watercolor Invitations',
      'Rustic Kraft Paper Invitations',
      'Custom Illustration Invitations',
      'Destination Wedding Invitations',
      'Interactive Invitations',
    ],
  },
  {
    eyebrow: 'Custom Designs',
    title: 'Digital Invitations',
    accent: 'Digital',
    description: (
      <>
        Make your event stand out with our <strong>Digital Invitation Services</strong>, offering modern, eco-friendly, and interactive invitations tailored to your style. From <strong>animated e-vites</strong> to <strong>RSVP-integrated invitations, social media invites, and custom digital cards</strong>, we ensure a seamless, engaging experience for your guests. Our expert designers create personalized digital invitations for <strong>corporate events, personal celebrations</strong>, and more, making it easy to share event details instantly. Set the tone for your event with digital invitations that are both stylish and convenient
      </>
    ),
    items: [
      'Animated Video Invitations',
      'E-vites with RSVP Integration',
      'Email Invitations',
      'Interactive Webpage Invitations',
      'Social Media Invitations',
      'QR Code Invitations',
      'Virtual Event Invitations',
      'Animated GIF Invitations',
      'Personalized E-Cards',
    ],
  },
];

const beautySections = [
  {
    eyebrow: 'Wedding Ready',
    title: 'Bridal Makeup Services',
    accent: 'Makeup',
    description: 'Transform your bridal look with our expert Bridal Makeup Service, designed to enhance your natural beauty for your big day. Whether you prefer a classic, glamorous, or modern style, our skilled makeup artists use high-quality products and personalized techniques to create a flawless, long-lasting look. Trust our makeup experts to make you feel radiant, from the ceremony to the celebration. Book your bridal makeup consultation today for a perfect, glowing look',
    items: [
      'Pre-Wedding Trial Session',
      'Customizable Makeup Styles',
      'Flawless Foundation Application',
      'Eye Makeup & Lashes',
      'Contouring & Highlighting',
      'Bridal Hair Styling',
      'Long-Lasting Makeup',
      'Touch-Up Services',
      'Makeup for Bridesmaids & Guests',
    ],
  },
  {
    eyebrow: 'Wedding Ready',
    title: 'Mehndi Services for Brides',
    accent: 'Mehndi',
    description: 'Enhance your bridal beauty with our expert Mehndi services. Our skilled Mehndi artists create custom, intricate designs that blend tradition and elegance. Whether traditional or modern styles, we craft the perfect design for your bridal look using natural henna for long-lasting, stunning results. Book your bridal Mehndi consultation today for a flawless, personalized experience',
    items: [
      'Bridal Mehndi Designs',
      'Henna Tattoo Services',
      'Custom Mehndi Designs',
      'Pre-Wedding Mehndi Trial',
      'Full-Hand & Foot Mehndi',
      'Traditional Bridal Mehndi',
      'Modern & Fusion Mehndi Styles',
      'Bridal Mehndi for Sangeet or Engagement',
      'Henna Removal Services',
    ],
  },
];


const bridalWearSections = [
  {
    eyebrow: 'Elegance For Every Moment',
    title: 'Bridal Wear Services',
    accent: 'Bridal',
    description: 'Our Bridal Wear Services offer luxurious, custom-designed bridal gowns, lehengas, and sarees, crafted with the finest fabrics and intricate embroidery. Whether you desire a classic wedding gown or a traditional lehenga, we provide personalized styles that reflect your unique personality and wedding vision. With expert craftsmanship and attention to detail, we ensure you look your absolute best on your special day',
    items: [
      'Custom Bridal Gowns',
      'Traditional Bridal Lehengas',
      'Bridal Sarees',
      'Bridal Ensemble Styling',
      'Bridal Accessories Consultation',
      'Bridal Fit and Alterations',
      'Bridal Footwear Selection',
      'Bridal Blouse and Dupatta Customization',
      'Bridal Attire Rental Services',
    ],
  },
  {
    eyebrow: 'Elegance For Every Moment',
    title: 'Jewelry Services for Brides and Grooms',
    accent: 'Jewelry',
    description: "Our Jewelry Services offer an exquisite selection of bridal and groom jewelry, designed to complement your attire and enhance your overall wedding look. From traditional gold and diamond jewelry to modern, custom-designed pieces, we provide a wide range of jewelry options to suit every bride and groom's taste. Whether you prefer traditional or contemporary styles, our expert jewelers offer personalized designs that make your wedding day even more special.",
    items: [
      'Custom Bridal Jewelry Design',
      'Kundan and Polki Jewelry',
      'Bridal Necklace Sets',
      'Bridal Earring Selection',
      'Groom Jewelry Consultation',
      'Jewelry Rentals for Weddings',
      'Bridal Hair Jewelry',
      'Personalized Wedding Bands',
      'Matching Jewelry Sets for Bridesmaids and Groomsmen',
    ],
  },
  {
    eyebrow: 'Elegance For Every Moment',
    title: 'Groom Wear Services',
    accent: 'Groom',
    description: "Our Groom Wear Services offer a range of stylish and elegant options to ensure you look your best on your special day. From classic tuxedos and custom-tailored suits to traditional sherwanis, we provide attire that suits every groom's style and wedding theme. Our expert stylists work closely with you to create a look that perfectly complements the bride's attire, ensuring you stand out in elegance and sophistication",
    items: [
      'Custom-Tailored Suits',
      'Sherwanis',
      'Tuxedos',
      'Nehru Jackets',
      'Bridal Party Coordination',
      'Groom Footwear Selection',
      'Accessories Consultation',
      'Bridal Blouse and Dupatta Customization',
      'Custom Groom Accessories Design',
    ],
  },
];

const giftsReturnSections = [
  {
    eyebrow: 'Personalized Keepsakes',
    title: 'Gifts & Return Gifts',
    accent: 'Gifts',
    description: (
      <>
        At <strong>India Solution</strong>, we specialize in creating <strong>custom-made gifts</strong> that leave a lasting impression. From unique <strong>Mini Me acrylic miniatures</strong> to personalized <strong>keychains, photo frames, and more</strong>, our gifts are crafted with care to match your imagination. Whether it's for birthdays, anniversaries, or just a gesture of love, we bring your ideas to life with top-quality materials and expert craftsmanship. Explore our wide range of personalized gifts, and let us help you create memories that last forever.
      </>
    ),
    items: [
      '2D Acrylic Mini Me Miniatures',
      'Custom Keychains',
      'Photo Frames',
      'Printed Clocks',
      'Customized Cups',
      'Name Plates',
      'Wall Art Decor',
      'Customized Lamps',
      'Event Souvenirs',
    ],
  },
];

const specialEntriesSections = [
  {
    eyebrow: 'Grand Arrival Concepts',
    title: 'Exclusive Special Entries for Couples: Where Dreams Take Center Stage',
    accent: 'Special',
    description: 'Make your wedding grander with India Solution\'s Special Entry Services! We specialize in creating jaw-dropping couple entries with pyrotechnics, creative themes, and unforgettable moments that leave your guests mesmerized. From sparkling pyro works to royal chariots, our innovative ideas bring your dream wedding to life. Let us add a touch of magic and grandeur to your big day with customized couple entry options designed to make every moment memorable.',
    items: [
      'Grand Firework Displays',
      'Royal Carriage & Vintage Car Entry',
      'Cold Pyro and Fog Effects',
      'Flower Shower Entry',
      'LED Dance Performances',
      'Thematic Couple Walkways',
      'Drone Show Entry',
      'Live Band',
      'Sparkling Umbrella Entry',
    ],
  },
];

const transportationSections = [
  {
    eyebrow: 'Luxury Mobility',
    title: 'Premium Event Transportation Services',
    accent: 'Transportation',
    description: (
      <>
        Experience <strong>seamless and luxurious event transportation</strong> with our premium services, perfect for <strong>weddings, corporate events, and special occasions</strong>. From <strong>luxury bridal cars and groom entries</strong> to <strong>guest shuttle services and vintage car rentals</strong>, we ensure punctuality, comfort, and style. Let our expert team handle <strong>guest logistics, valet services, and premium vehicle arrangements</strong> to make your event stress-free and unforgettable.
      </>
    ),
    items: [
      'Luxury Cars for Bride & Groom',
      'Guest Shuttle Services',
      'Airport Pick-Up & Drop Services',
      'Vintage Car Rentals',
      'VIP and Executive Cars',
      'Valet Parking Services',
      'Event Logistics Vehicles',
      'Tempo Travellers & Mini Buses',
      'Custom Decorated Vehicles',
    ],
  },
];

const birthdayDecorationSections = [
  {
    eyebrow: 'Celebration Styling',
    title: 'Unforgettable Birthday Celebrations Tailored to You',
    accent: 'Birthday',
    description: (
      <>
        Make every birthday a <strong>memorable experience</strong> with our expert <strong>birthday event planning services</strong>. At <strong>India Solution</strong>, we specialize in crafting <strong>personalized birthday celebrations</strong> that reflect the personality and preferences of the birthday honoree. From <strong>thematic decorations to entertainment arrangements</strong>, we handle every aspect of the event, ensuring a seamless and joyful experience for everyone. Whether it's an intimate gathering or a grand celebration, our team brings creativity, elegance, and attention to detail to make your birthday event truly special. We ensure that each <strong>birthday party</strong> is filled with fun, laughter, and lasting memories.
      </>
    ),
    items: [
      'Thematic Party Decor',
      'Birthday Cake & Dessert Table Setup',
      'Entertainment & Activities',
      'Customized Invitations & Party Favors',
      'Venue Selection & Setup',
      'Personalized Photo Booth',
      'Music & Sound System Setup',
      'Lighting & Ambient Effects',
      'Party Host/Emcee Services',
    ],
  },
];

const funActivitiesSections = [
  {
    eyebrow: 'Playful Experiences',
    title: 'Birthday Fun Activities',
    accent: 'Fun',
    description: 'We make birthday celebrations unforgettable with creative and engaging fun activities for all age groups. Our team ensures the perfect blend of entertainment and excitement, making every birthday special and memorable. From interactive games to artistic experiences, we bring fun-filled moments to life, ensuring guests leave with joyful memories',
    items: [
      'Magician Show',
      'Balloon Twisting',
      'Face Painting',
      'Photo Booth with Props',
      'Puppet Show',
      'Treasure Hunt',
      'Carnival Games',
      'DIY Art & Craft Corner',
      'Live Cartoon Characters',
    ],
  },
  {
    eyebrow: 'Playful Experiences',
    title: 'Corporate Fun Activities',
    accent: 'Corporate',
    description: (
      <>
        Fun activities designed to boost employee engagement, teamwork, and enjoyment. Whether it&rsquo;s a <strong>corporate gathering, annual day, team-building retreat, or product launch</strong>, we ensure every event is filled with excitement while maintaining a professional touch. Our activities are designed to <strong>encourage collaboration, break the ice, and leave a lasting positive impact</strong>
      </>
    ),
    items: [
      'Team-Building Games',
      'Escape Room Challenge',
      'Icebreaker Sessions',
      'Trivia Quiz Competitions',
      'Photo Booth with Corporate Branding',
      'Carnival Games',
      'Wellness Activities',
      'Virtual Reality (VR) Booth',
      'Live Music & Karaoke',
    ],
  },
  {
    eyebrow: 'Playful Experiences',
    title: 'School & College Fun Activities',
    accent: 'Fun',
    description: 'Fun activities designed for school and college events. Our goal is to create interactive experiences where students can explore new concepts while having fun. These activities encourage curiosity, teamwork, and creativity, making learning enjoyable and memorable.',
    items: [
      'Quiz Competitions',
      'Debate & Elocution Contests',
      'STEM Workshops',
      'Science Experiment Booths',
      'Spelling Bee Contest',
      'Educational Treasure Hunt',
      'Storytelling Sessions',
      'Math Puzzle Stations',
      'Book Fair with Reading Corners',
    ],
  },
];
const corporateNetworkingSections = [
  {
    eyebrow: 'Business Growth',
    title: 'Networking Events for Business Growth',
    accent: 'Networking',
    description: 'Elevate your business connections with our expertly organized networking events designed to foster meaningful relationships. Whether you\'re hosting a small mixer or a large-scale conference, we ensure every detail is tailored to create an impactful, professional experience. Connect with industry leaders and peers to unlock new opportunities and grow your business',
    items: [
      'Executive Networking Summits',
      'Industry Leadership Panels',
      'Peer-to-Peer Networking Forums',
      'Strategic Partnering Events',
      'Corporate Networking Retreats',
      'Investor Networking Forums',
      'Tech & Innovation Networking Sessions',
      'Global Networking Conclaves',
      'Product & Service Launch Networking',
    ],
  },
];
const conferencesSections = [
  {
    eyebrow: 'Industry Leaders',
    title: 'Transformative Conferences for Industry Leaders',
    accent: 'Conferences',
    description: 'Host impactful conferences designed to bring together thought leaders, industry experts, and innovators. Our expertly managed conferences foster dynamic discussions, offer valuable insights, and provide unparalleled networking opportunities to help you stay ahead in your field. Whether you\'re focused on innovation, technology, or leadership, we ensure every detail is tailored to make your conference a success',
    items: [
      'Leadership & Executive Conferences',
      'Industry-Specific Conference Series',
      'Corporate & Business Development Conferences',
      'Innovation & Technology Conferences',
      'Networking & Trade Conferences',
      'Academic & Research Conferences',
      'Tech & Innovation Networking Sessions',
      'Product Innovation & Launch Conferences',
      'Global Industry Conventions',
    ],
  },
];
const productLaunchSections = [
  {
    eyebrow: 'Brand Impact',
    title: 'Strategic Product Launches to Drive Brand Awareness and Market Impact',
    accent: 'Product',
    description: 'Transform your product launch into a memorable experience that excites your target audience and amplifies your brand presence. From pre-launch teasers to post-launch follow-ups, we create end-to-end event strategies that generate buzz, drive media attention, and deliver measurable business results. Let us ensure that your product gets the launch it deserves',
    items: [
      'Exclusive Launch Events',
      'Virtual Product Launches',
      'Media & Press Launches',
      'Pop-Up Launch Experiences',
      'Product Demonstration Sessions',
      'Launch Parties & Celebrations',
      'Collaborative Partner Launches',
      'Investor & Stakeholder Launches',
      'Interactive Product Launch Tours',
    ],
  },
];
const corporateMeetingsSections = [
  {
    eyebrow: 'Execution Precision',
    title: 'Streamlined Corporate Meetings to Foster Collaboration and Drive Success',
    accent: 'Corporate',
    description: 'Elevate your corporate meetings with meticulously planned and flawlessly executed events designed to boost productivity, collaboration, and decision-making. Whether it\'s a strategic planning session or a team alignment meeting, we tailor each experience to meet your specific business needs, ensuring smooth logistics and optimal outcomes for your company.',
    items: [
      'Strategic Planning Meetings',
      'Executive Leadership Meetings',
      'Board of Directors Meetings',
      'Team Building Meetings',
      'Quarterly Business Review (QBR) Meetings',
      'Productivity and Innovation Workshops',
      'Client & Partner Meetings',
      'Corporate Training & Development Meetings',
      'Annual General Meetings (AGM)',
    ],
  },
];
const preWeddingCeremonySections = [
  {
    eyebrow: 'Pre-Wedding Ceremony Services',
    title: 'Pre-Wedding Ceremony Services',
    accent: 'Ceremony',
    description: (
      <>
        Our <strong>Pre-Wedding Ceremony Services</strong> include a range of celebrations and rituals that set the stage for your wedding day. From <strong>engagement parties</strong> to <strong>mehndi celebrations and sangeet events</strong>, we help plan and execute each pre-wedding function with creativity and precision. Our expert team ensures everything is taken care of, including the venue, decor, entertainment, and coordination, so you can focus on making memories with your loved ones. Let us help you create a seamless and unforgettable pre-wedding experience that builds excitement for your special day.
      </>
    ),
    items: [
      'Engagement Party Planning',
      'Mehndi Ceremony Coordination',
      'Sangeet Party Planning',
      'Bridal Shower and Groomâ€™s Party',
      'Pre-Wedding Photoshoots',
      'Customized Invitations for Pre-Wedding Events',
      'Catering and Menu Planning for Pre-Wedding Functions',
      'Event Decor and Floral Arrangements',
      'Entertainment and Music Services',
    ],
  },
];

const promotionsSections = [
  {
    eyebrow: 'Promotional Services',
    title: 'All-in-One Promotional Services for Products, Events, and Brands',
    accent: 'Products, Events, and Brands',
    description: (
      <>
        Enhance the visibility of your <strong>products, events, expos, and brands</strong> with our <strong>tailored promotional services</strong> that cater to a wide range of needs. From <strong>product launches and event promotions to brand awareness campaigns and expo marketing</strong>, our strategies are designed to elevate your presence across all platforms. With a combination of traditional and digital tactics, such as <strong>flyers, social media ads, event sponsorship, and PR campaigns</strong>, we create impactful marketing plans that drive engagement and amplify your message. Whatever your promotion goals are, we provide comprehensive solutions that ensure your brand shines, attracts attention, and resonates with your target audience.
      </>
    ),
    items: [
      'Mobile Van Advertising',
      'Posters and Banners',
      'Stickers and Decals',
      'Flyers and Brochures',
      'Billboard Advertising',
      'Digital Screens and Kiosks',
      'Event Sponsorship and Branded Merchandise',
      'Public Relations (PR) Campaigns',
      'Sampling and Demonstrations',
    ],
  },
  {
    eyebrow: 'Promotional Products',
    title: 'Custom-Branded Products for Effective Promotion',
    accent: 'Promotion',
    description: (
      <>
        Elevate your brand visibility with our <strong>custom-made promotional products</strong>, designed to leave a lasting impression. We offer a variety of high-quality items that can be personalized with your logo, message, or QR codes, making them perfect for giveaways, events, and corporate promotions. Whether you want to offer your clients branded <strong>keychains, bags, or water bottles</strong>, we provide a wide range of customizable products to suit every need. These personalized items help increase brand recognition while providing functional, everyday use that keeps your business in mind
      </>
    ),
    items: [
      'Custom Keychains',
      'Branded Water Bottles',
      'Personalized Bags',
      'Custom Mugs & Cups',
      'Printed Notebooks & Journals',
      'Personalized Pens',
      'Custom USB Drives',
      'Custom T-Shirts & Apparel',
      'Printed QR Code Products',
    ],
  },
];

const tradeShowsSections = [
  {
    eyebrow: 'Trade Shows',
    title: 'Trade Shows & Exhibition Events',
    accent: 'Exhibition',
    description: (
      <>
        for <strong>trade shows, exhibitions</strong>, and <strong>product launches</strong>. Our end-to-end solutions ensure seamless <strong>event coordination, booth design, attendee registration</strong>, and <strong>logistics management</strong>, creating a professional and engaging environment for exhibitors and visitors alike. From pre-event planning to post-event follow-ups, we focus on delivering an exceptional experience that boosts brand visibility, drives lead generation, and enhances attendee engagement
      </>
    ),
    items: [
      'Attendee Registration & Ticketing',
      'Logistics & Transportation Services',
      'Custom Booth Designs & Setup',
      'Branding & Signage Solutions',
      'Audio-Visual Equipment & Technology Support',
      'Staffing & On-Site Assistance',
      'Marketing & Promotion',
      'Booth Maintenance & Support',
      'Post-Event Follow-up & Lead Management',
    ],
  },
];

const cateringSections = [
  {
    eyebrow: 'Culinary Experiences',
    title: 'Exquisite Catering Services Native & Western Flavors for Every Event',
    accent: 'Catering',
    description: (
      <>
        At <strong>India Solution Event Management</strong>, we offer exceptional catering services that blend the rich flavors of native Indian cuisine with the elegance of Western-style dishes. Our expert chefs focus on delivering the highest quality food, prepared with fresh ingredients and attention to detail. Whether it&apos;s a wedding, corporate event, or private celebration, we ensure a memorable dining experience with delicious food and flawless service.
      </>
    ),
    listTitle: 'We Deal With Various Quality Cuisines',
    items: [
      'Pure Vegetarian Cuisine',
      'Non-Vegetarian Cuisine',
      'Traditional Indian Cuisine',
      'Western Cuisine',
      'Fusion Cuisine',
      'Premium/Signature Dishes',
      'Street Food/Chaat Station',
      'Dessert & Confectionery Station',
      'Healthy & Diet-Friendly Options',
    ],
  },
  {
    eyebrow: 'Custom Cakes',
    title: 'Delight in Our Premium Custom Cakes for Every Celebration',
    accent: 'Custom Cakes',
    description: (
      <>
        Indulge in our exquisite custom cakes, expertly crafted to make your special moments unforgettable. Whether it&apos;s a wedding, birthday, anniversary, or corporate event, our skilled bakers create personalized cakes using the finest ingredients, ensuring exceptional taste and stunning presentation. From elegant multi-tiered wedding cakes to fun-themed birthday cakes and sophisticated corporate cakes, each design is customized to match your style, theme, and preferences perfectly. Make your celebrations sweeter with our luxury cakes, tailored to impress.
      </>
    ),
    items: [
      'Designer Wedding Cakes',
      'Elegant Engagement Cakes',
      'Personalized Birthday Cakes',
      'Anniversary Cakes',
      'Custom Theme Cakes',
      'Luxury Festive Cakes',
      'Corporate Event Cakes',
      'Healthy & Vegan Cakes',
      'Dessert Tables & Cupcake Towers',
    ],
  },
  {
    eyebrow: 'Sweet Treats',
    title: 'Fun Edible Services',
    accent: 'Edible',
    description: (
      <>
        Bring joy to your events with our delightful fun edibles that add a burst of sweetness and excitement. From cotton candy and fancy candies to cartoon character cakes and novelty treats, we specialize in creating playful and creative edible masterpieces that captivate both kids and adults alike. Perfect for weddings, birthdays, corporate events, and other celebrations, our fun edibles are designed to complement your event&apos;s theme while satisfying everyone&apos;s sweet tooth. Let us turn your celebration into a memorable experience with these unique and delicious treats.
      </>
    ),
    items: [
      'Cotton Candy Stalls',
      'Fancy Candies & Lollipops',
      'Cartoon Character Cakes',
      'Themed Cake Pops',
      'Cupcake Decoration Stations',
      'Novelty Desserts',
      'Chocolate Fountains',
      'Ice Cream & Gelato Stations',
      'Edible Party Favors',
    ],
  },
];

const photographyVideographySections = [
  {
    eyebrow: 'Visual Memories',
    title: 'Expert Photography & Videography for Events',
    accent: 'Photography & Videography',
    description: '',
    items: [
      'Still Photography',
      'Live Event Streaming',
      'Candid Photography',
      'Event Highlights Reel',
      'Album Creation',
      'Cinematic Video Production',
      'Drone Photography',
      'Live Event Coverage',
      'Product Photography',
    ],
  },
];

const DetailTitle = ({ title, accent }) => {
  if (!accent || !title.includes(accent)) {
    return <>{title}</>;
  }

  const [before, after] = title.split(accent);
  return (
    <>
      {before}<span className="text-gradient">{accent}</span>{after}
    </>
  );
};

const ServiceContentSections = ({ sections }) => (
  <motion.section
    variants={staggerContainer}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="mt-8 grid gap-6"
  >
    {sections.map((section) => (
      <motion.article key={section.title} variants={fadeUp} className="service-detail-section relative overflow-hidden rounded-xl p-6 md:p-7">
        <div className="service-detail-section-glow" />
        <div className="relative grid gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <span className="service-detail-eyebrow mb-2 block">{section.eyebrow}</span>
            <h2 className="site-heading mb-4 text-3xl font-bold leading-tight md:text-5xl">
              <DetailTitle title={section.title} accent={section.accent} />
            </h2>
            {section.description && (
              <p className="max-w-2xl text-sm leading-7 text-gray-300 md:text-base">{section.description}</p>
            )}
            <Link to="/contact" className="service-detail-cta mt-6 inline-flex items-center gap-2">
              <Mail size={15} />
              Contact us
            </Link>
          </div>

          <div>
            {section.listTitle && (
              <h3 className="site-heading mb-5 text-2xl font-bold leading-tight md:text-3xl">
                {section.listTitle}
              </h3>
            )}
            <div className="grid gap-3 sm:grid-cols-2">
              {section.items.map((item) => (
                <div key={item} className="service-detail-check-item">
                  <span className="service-detail-check-icon"><CheckCircle2 size={14} strokeWidth={2.2} /></span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.article>
    ))}
  </motion.section>
);

const BeautyServicesContent = () => (
  <>
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="service-detail-section relative mt-8 overflow-hidden rounded-xl p-6 text-center md:p-7"
    >
      <div className="service-detail-section-glow" />
      <div className="relative mx-auto max-w-4xl">
        <span className="service-detail-eyebrow mb-2 block">Bridal Beauty</span>
        <h2 className="site-heading mb-3 text-3xl font-bold leading-tight md:text-5xl">
          Beauty Services, <span className="text-gradient">Makeup, and Mehndi</span>
        </h2>
        <p className="text-sm leading-7 text-gray-300 md:text-base">
          Enhance your beauty and glow with our expert Beauty Services, Makeup, and Mehndi - creating the perfect look for your unforgettable moments
        </p>
      </div>
    </motion.section>
    <ServiceContentSections sections={beautySections} />
  </>
);


const BridalWearContent = () => (
  <>
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="service-detail-section relative mt-8 overflow-hidden rounded-xl p-6 text-center md:p-7"
    >
      <div className="service-detail-section-glow" />
      <div className="relative mx-auto max-w-4xl">
        <span className="service-detail-eyebrow mb-2 block">Elegance For Every Moment</span>
        <h2 className="site-heading mb-3 text-3xl font-bold leading-tight md:text-5xl">
          Bridal & Groom Wear <span className="text-gradient">and Jewelry</span>
        </h2>
        <p className="text-sm leading-7 text-gray-300 md:text-base">
          Complete styling support for brides and grooms, from couture attire to jewelry details that complete every wedding look.
        </p>
      </div>
    </motion.section>
    <ServiceContentSections sections={bridalWearSections} />
  </>
);

const PhotographyVideographyContent = () => (
  <>
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-8 text-center"
    >
      <h2 className="site-heading mb-8 text-4xl font-bold md:text-5xl">
        Our Photography and Videography Services
      </h2>
    </motion.section>

    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="service-detail-section relative mb-8 overflow-hidden rounded-xl p-6 md:p-7"
    >
      <div className="service-detail-section-glow" />
      <div className="relative grid gap-7 lg:grid-cols-2 lg:items-center">
        <div>
          <h3 className="site-heading mb-4 text-2xl font-bold leading-tight md:text-3xl text-gray-100">
            Comprehensive Photography Services for Every Occasion: Personal and Corporate Events Covered
          </h3>
          <p className="text-sm leading-7 text-gray-300 md:text-base">
            At India Solution Event Management, we provide expert photography services for both personal events (weddings, birthdays, engagements) and corporate events (product launches, conferences, seminars). Our experienced photographers capture every moment with precision, ensuring high-quality visuals that tell your unique story. From intimate gatherings to grand business events, trust us to deliver timeless memories.
          </p>
        </div>
        <div className="h-64 rounded-xl bg-gray-800 flex items-center justify-center text-gray-500 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Camera" className="w-full h-full object-cover opacity-60" />
        </div>
      </div>
    </motion.section>

    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="service-detail-section relative overflow-hidden rounded-xl p-6 md:p-7"
    >
      <div className="service-detail-section-glow" />
      <div className="relative grid gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="h-64 rounded-xl bg-gray-100 flex flex-col items-center justify-center text-yellow-500">
          <div className="flex gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            ))}
          </div>
        </div>

        <div>
          <h2 className="site-heading mb-4 text-3xl font-bold leading-tight md:text-4xl">
            Expert Photography & Videography for Events
          </h2>
          
          <div className="mb-6 text-gray-400">
             <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-camera"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {photographyVideographySections[0].items.map((item) => (
              <div key={item} className="service-detail-check-item">
                <span className="service-detail-check-icon"><CheckCircle2 size={14} strokeWidth={2.2} /></span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  </>
);

const GiftsReturnContent = () => <ServiceContentSections sections={giftsReturnSections} />;

const SpecialEntriesContent = () => <ServiceContentSections sections={specialEntriesSections} />;

const TransportationContent = () => <ServiceContentSections sections={transportationSections} />;

const BirthdayDecorationContent = () => <ServiceContentSections sections={birthdayDecorationSections} />;

const FunActivitiesContent = () => <ServiceContentSections sections={funActivitiesSections} />;

const CateringContent = () => <ServiceContentSections sections={cateringSections} />;
const CorporateNetworkingContent = () => <ServiceContentSections sections={corporateNetworkingSections} />;
const ConferencesContent = () => <ServiceContentSections sections={conferencesSections} />;
const ProductLaunchesContent = () => <ServiceContentSections sections={productLaunchSections} />;
const CorporateMeetingsContent = () => <ServiceContentSections sections={corporateMeetingsSections} />;
const PreWeddingCeremonyContent = () => <ServiceContentSections sections={preWeddingCeremonySections} />;
const TradeShowsContent = () => <ServiceContentSections sections={tradeShowsSections} />;
const PromotionsContent = () => <ServiceContentSections sections={promotionsSections} />;
const ServiceDetail = () => {
  const { serviceSlug, itemSlug } = useParams();
  const service = findServiceBySlug(serviceSlug);
  const selectedItem = itemSlug ? findServiceItemBySlug(service, itemSlug) : null;

  if (!service || (itemSlug && !selectedItem)) {
    return (
      <section className="service-detail-page relative overflow-hidden px-6 pb-20 pt-40 text-white lg:px-12 lg:pt-44">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <span className="service-detail-eyebrow mb-4 block">Service</span>
          <h1 className="site-heading mb-6 text-4xl font-bold">Service Not Found</h1>
          <p className="mb-8 text-gray-300">The service you opened is not available.</p>
          <Link to="/services" className="service-detail-cta inline-flex items-center gap-2">
            <ArrowLeft size={16} />
            View All Services
          </Link>
        </div>
      </section>
    );
  }

  const Icon = iconMap[service.icon] ?? Sparkles;
  const relatedServices = serviceCatalog.filter((item) => item.slug !== service.slug).slice(0, 3);
  const selectedItemSlug = selectedItem ? slugifyServiceItem(selectedItem) : '';
  const isInvitationStationery = selectedItemSlug === 'invitations-and-stationery';
  const isBeautyServices = selectedItemSlug === 'beauty-services-makeup-and-mehndi';
  const isBridalWear = selectedItemSlug === 'bridal-and-groom-wear-and-jewelry';
  const isGiftsReturn = selectedItemSlug === 'gifts-and-return-gifts';
  const isSpecialEntries = selectedItemSlug === 'special-entries';
  const isTransportation = selectedItemSlug === 'transportation';
  const isBirthdayDecoration = selectedItemSlug === 'birthday-decoration';
  const isFunActivities = selectedItemSlug === 'fun-activities';
  const isNetworkingEvents = selectedItemSlug === 'networking-events';
  const isConferences = selectedItemSlug === 'conferences';
  const isProductLaunches = selectedItemSlug === 'product-launches';
  const isCorporateMeetings = selectedItemSlug === 'corporate-meetings';
  const isEventDecorFloralArrangements = selectedItemSlug === 'event-decor-and-floral-arrangements' || selectedItemSlug === 'decorations' || selectedItemSlug === 'theme-based-parties';
  const isPhotographyVideography = selectedItemSlug === 'photography-and-videography-services' || selectedItemSlug === 'photography-and-videography';
  const isCateringService = service.slug === 'catering' || selectedItemSlug === 'catering-services' || selectedItemSlug === 'catering';
  
  const isTradeShowService = service.slug === 'trade-show-exhibition-planning';
  const isPromotionsService = service.slug === 'promotions';

  return (
    <section className="service-detail-page relative overflow-hidden px-5 pb-20 pt-40 text-white lg:px-10 lg:pt-44">
      <div className="services-dots services-dots-left" />
      <div className="services-dots services-dots-right" />
      <div className="services-wave services-wave-left" />
      <div className="services-wave services-wave-right" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <Link to="/services" className="mb-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-gray-300 transition-colors hover:text-gold">
          <ArrowLeft size={14} />
          All Services
        </Link>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="service-detail-hero-card relative overflow-hidden rounded-xl p-7 md:p-8"
          >
            <div className="service-detail-hero-grid" />
            <div className="relative">
              <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-full border border-magenta/55 bg-magenta/10 text-magenta shadow-[0_0_24px_rgba(233,30,99,0.22)]">
                <Icon size={29} strokeWidth={1.7} />
              </div>
              <span className="service-detail-eyebrow mb-3 block">{service.title}</span>
              <h1 className="site-heading max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
                {selectedItem ? (
                  <>
                    {selectedItem}
                    <span className="text-gradient block text-3xl md:text-5xl">Service</span>
                  </>
                ) : (
                  <>
                    {service.title}
                    <span className="text-gradient block text-3xl md:text-5xl">Planning</span>
                  </>
                )}
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-300 md:text-base">
                {selectedItem
                  ? `India Solution handles ${selectedItem.toLowerCase()} as part of our ${service.title.toLowerCase()} service, with careful planning, polished execution, and attention to every guest-facing detail.`
                  : service.description}
              </p>
              <Link to="/contact" className="service-detail-cta mt-7 inline-flex items-center gap-2">
                Enquire Now
                <ChevronRight size={15} />
              </Link>
            </div>
          </motion.section>

          <motion.aside
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="service-detail-chooser relative overflow-hidden rounded-xl p-6 md:p-7"
          >
            <span className="service-detail-eyebrow mb-2 block">Service Points</span>
            <h2 className="site-heading mb-5 text-3xl font-semibold">Choose A Detail</h2>
            <div className="grid gap-3">
              {service.items.map((item) => {
                const isActive = item === selectedItem;
                return (
                  <motion.div key={item} variants={fadeUp}>
                    <Link
                      to={`/services/${service.slug}/${slugifyServiceItem(item)}`}
                      className={`service-detail-choice ${isActive ? 'service-detail-choice-active' : ''}`}
                    >
                      <ChevronRight size={13} className="shrink-0" />
                      <span>{item}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.aside>
        </div>

        {isInvitationStationery && <ServiceContentSections sections={invitationSections} />}
        {isBeautyServices && <BeautyServicesContent />}
        {isBridalWear && <BridalWearContent />}
        {isGiftsReturn && <GiftsReturnContent />}
        {isSpecialEntries && <SpecialEntriesContent />}
        {isTransportation && <TransportationContent />}
        {isBirthdayDecoration && <BirthdayDecorationContent />}
        {isFunActivities && <FunActivitiesContent />}
        {isNetworkingEvents && <CorporateNetworkingContent />}
        {isConferences && <ConferencesContent />}
        {isProductLaunches && <ProductLaunchesContent />}
        {isCorporateMeetings && <CorporateMeetingsContent />}
        {isCateringService && <CateringContent />}
        {isEventDecorFloralArrangements && <PreWeddingCeremonyContent />}
        {isPhotographyVideography && <PhotographyVideographyContent />}
        {isTradeShowService && <TradeShowsContent />}
        {isPromotionsService && <PromotionsContent />}

        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10"
        >
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="service-detail-eyebrow mb-2 block">Related Services</span>
              <h2 className="site-heading text-3xl font-semibold">Explore More</h2>
            </div>
            <Link to="/services" className="text-xs font-semibold uppercase tracking-[0.18em] text-gold transition-colors hover:text-orange">
              View All
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {relatedServices.map((item) => {
              const RelatedIcon = iconMap[item.icon] ?? Sparkles;
              return (
                <motion.article key={item.slug} variants={fadeUp} className="service-related-card rounded-xl p-5">
                  <RelatedIcon className="mb-4 text-magenta" size={26} strokeWidth={1.7} />
                  <h3 className="site-heading mb-2 text-lg font-semibold">{item.title}</h3>
                  <p className="mb-4 text-xs leading-5 text-gray-400">{item.description}</p>
                  <Link to={`/services/${item.slug}`} className="text-xs font-semibold text-gold transition-colors hover:text-orange">
                    Explore Service
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </motion.section>
      </div>
    </section>
  );
};

export default ServiceDetail;
