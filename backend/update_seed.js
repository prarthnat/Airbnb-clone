const fs = require('fs');
const seedPath = 'src/data/seed.js';
const seedContent = fs.readFileSync(seedPath, 'utf8');

const newPhotos = [
  // Living Room
  { id: 'p1', url: '/reference/P2_L1.jpeg', caption: 'Living room wide angle', category: 'Living Room', featured: true },
  { id: 'p2', url: '/reference/P3_L1.jpeg', caption: 'Living room seating area', category: 'Living Room', featured: true },
  { id: 'p3', url: '/reference/P3_L2.jpeg', caption: 'Living room sofa detail', category: 'Living Room', featured: true },
  
  // Living room 2
  ...[1,2,3,4,5,6,7].map(i => ({ id: 'lr2_'+i, url: `/reference/living_room_2_${i}.jpg`, caption: 'Living room detail', category: 'Living room 2', featured: true })),
  
  // Kitchen
  ...[1,2].map(i => ({ id: 'k_'+i, url: `/reference/kitchen_${i}.jpg`, caption: 'Kitchen view', category: 'Kitchen', featured: true })),
  
  // Bedroom
  ...[1,2,3,4,5,6].map(i => ({ id: 'b_'+i, url: `/reference/bedroom_${i}.jpg`, caption: 'Bedroom view', category: 'Bedroom', featured: true })),
  
  // Bathroom
  { id: 'ba_1', url: '/reference/bathroom_1.jpg', caption: 'Bathroom view', category: 'Bathroom', featured: true },
  
  // Gym
  ...[1,2,3,4,5].map(i => ({ id: 'g_'+i, url: `/reference/gym_${i}.jpg`, caption: 'Gym view', category: 'Gym', featured: true })),
  
  // Exterior (skipping exterior_5 because it is a duplicate of 4)
  ...[1,2,3,4,6].map(i => ({ id: 'e_'+i, url: `/reference/exterior_${i}.jpg`, caption: 'Exterior view', category: 'Exterior', featured: true })),
  
  // Pool (skipping pool_3 because it is a duplicate of 1)
  ...[1,2].map(i => ({ id: 'pool_'+i, url: `/reference/pool_${i}.jpg`, caption: 'Pool view', category: 'Pool', featured: true })),
  
  // Additional photos
  { id: 'a_0', url: '/reference/additional_0.jpg', caption: 'Additional view', category: 'Additional photos', featured: true },
  ...[1,2,3,4,5,6,7,8,9].map(i => ({ id: 'a_'+i, url: `/reference/additional_${i}.jpg`, caption: 'Additional view', category: 'Additional photos', featured: true }))
];

const newPhotosString = JSON.stringify(newPhotos, null, 4).replace(/"([^"]+)":/g, '$1:').replace(/"/g, "'");

const regex = /photos:\s*\[[\s\S]*?\],\n\s*nearbyStays:/;
const updatedContent = seedContent.replace(regex, `photos: ${newPhotosString},\n  nearbyStays:`);

fs.writeFileSync(seedPath, updatedContent);
console.log('Seed updated!');
