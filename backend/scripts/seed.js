import DNAArtist from '../models/dnaModel.js';
import sequelize from '../config/db.js';

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    
    const artists = [
      {
        name: "SonicBloom",
        image_url: "https://images.unsplash.com/photo-1605460504109-f347ec557483?w=500&q=75&auto=format&fit=crop",
        genres: "Electropop",
        description: "A vibrant blend of synth and soul, combining electric rhythms with pop vocals.",
        audio_preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        tags: ["synth", "electronic", "groovy"]
      },
      {
        name: "EchoVerse",
        image_url: "https://images.unsplash.com/photo-1712530967389-e4b5b16b8500?w=500&q=75&auto=format&fit=crop",
        genres: "Ambient",
        description: "Soothing textures with evolving soundscapes perfect for background focus.",
        audio_preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        tags: ["ambient", "space", "relax"]
      },
      // Add other artists as needed
    ];

    await DNAArtist.bulkCreate(artists);
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();