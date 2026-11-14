
const foods = [
  // NIGERIAN MEALS
  {
    id: 1,
    name: 'Jollof Rice',
    category: 'Nigerian Meals',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600',
    description: 'Delicious Nigerian party jollof rice.'
  },
  {
    id: 2,
    name: 'Fried Rice',
    category: 'Nigerian Meals',
    price: 4000,
    image: 'https://cheflolaskitchen.com/wp-content/uploads/2015/06/Fried-Rice-20.jpg.webp',
    description: 'Nigerian fried rice with vegetables and seasoning.'
  },
  {
    id: 3,
    name: 'Ofada Rice',
    category: 'Nigerian Meals',
    price: 4500,
    image: 'https://wunmiselectivekitchen.com/storage/2024/03/wsk14.jpg',
    description: 'Local ofada rice served with traditional pepper sauce.'
  },
  {
    id: 4,
    name: 'Amala and Ewedu',
    category: 'Nigerian Meals',
    price: 4000,
    image: 'https://cimages.timbu.com/guides/2017/03/informatin-nigeria-amala.jpeg',
    description: 'Soft amala served with ewedu, gbegiri and stew.'
  },
  {
    id: 5,
    name: 'Pounded Yam and Egusi',
    category: 'Nigerian Meals',
    price: 5000,
    image: 'https://www.peppera.app/generated/landing/recipe-egusi-pounded-yam.webp',
    description: 'Fresh pounded yam served with rich egusi soup.'
  },
  {
    id: 6,
    name: 'Eba and Egusi Soup',
    category: 'Nigerian Meals',
    price: 4500,
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Egusi_soup_and_Eba.jpg?width=600',
    description: 'Hot eba served with delicious Nigerian egusi soup.'
  },
  {
    id: 7,
    name: 'Pounded Yam and Oha Soup',
    category: 'Nigerian Meals',
    price: 5000,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxlXPjzMj-rx508nYCFuERtfBexnqyjGcxcPs8An924A&s',
    description: 'Traditional pounded yam served with Oha soup.'
  },
  {
    id: 9,
    name: 'Amala and Gbegiri',
    category: 'Nigerian Meals',
    price: 4500,
    image: 'https://cimages.timbu.com/guides/2017/03/informatin-nigeria-amala.jpeg',
    description: 'Amala served with gbegiri, ewedu and tasty stew.'
  },
  {
    id: 10,
    name: 'Semo and Ogbono Soup',
    category: 'Nigerian Meals',
    price: 4500,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm-gOrwifD14Jy3uw5sYvz-jTDIXNWREg0ZnI6vWiEK2jAyuCAz5PSm9A&s=10',
    description: 'Smooth semolina served with rich ogbono soup.'
  },
  {
    id: 11,
    name: 'Eba and Okra Soup',
    category: 'Nigerian Meals',
    price: 4000,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAMXBJApkbjdt9qlM_tQ9xcRI5TA4fN7OOR5UlynQ7119WMjV-lil75CXe&s=10',
    description: 'Eba served with fresh okra soup.'
  },
  {
    id: 12,
    name: 'Beans and Plantain',
    category: 'Nigerian Meals',
    price: 3500,
    image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSFkIkIopuXKI451b_7l_xuW7bRdBCMUhJVZm_xI5wYQVfNst2s',
    description: 'Well-cooked beans served with sweet fried plantain.'
  },
  {
    id: 13,
    name: 'Yam and Egg Sauce',
    category: 'Nigerian Meals',
    price: 3000,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmJKAhKUP1bWKNZ6BbnhIg1sYB-eOZ9UTIyaUgMLhS-ahLcMonTtDEr2Q&s=10',
    description: 'Boiled yam served with freshly prepared egg sauce.'
  },
  {
    id: 14,
    name: 'Pepper Soup',
    category: 'Nigerian Meals',
    price: 5000,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdNlbiEu3IMX0gKlqzyNbDYVEQceLY5FQ9VryQndR_G9_mgKbj02ygHoS544HCgd-1Dq6Dn1xbKuuqF83i1N_CLbhMskyDEuVdjnxz_qM&s=10',
    description: 'Hot and spicy Nigerian-style pepper soup.'
  },

  // BURGERS
  {
    id: 15,
    name: 'Beef Burger',
    category: 'Burgers',
    price: 5000,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600',
    description: 'Juicy beef burger with fresh vegetables and sauce.'
  },
  {
    id: 16,
    name: 'Chicken Burger',
    category: 'Burgers',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600',
    description: 'Crispy chicken burger with lettuce and mayonnaise.'
  },
  {
    id: 17,
    name: 'Cheese Burger',
    category: 'Burgers',
    price: 5500,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0SbcwC6qqgnL-AB2FDYkPVsoWAFyym_5-ncgw4EMVcvNylRaAqdC-NHTZVVYEl1jWuyflq2mMfq2ij9VVZyXKK5hpTx-osFXmx2ZA3Zw&s=10',
    description: 'Beef burger topped with melted cheese.'
  },

  // PIZZA
  {
    id: 18,
    name: 'Pepperoni Pizza',
    category: 'Pizza',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600',
    description: 'Classic pizza topped with pepperoni and cheese.'
  },
  {
    id: 19,
    name: 'Chicken Pizza',
    category: 'Pizza',
    price: 9000,
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=600',
    description: 'Delicious pizza with chicken and mozzarella cheese.'
  },
  {
    id: 20,
    name: 'Vegetable Pizza',
    category: 'Pizza',
    price: 7500,
    image: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?w=600',
    description: 'Pizza topped with fresh vegetables and cheese.'
  },

  // CHICKEN
  {
    id: 21,
    name: 'Grilled Chicken',
    category: 'Chicken',
    price: 6500,
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=600',
    description: 'Well-seasoned grilled chicken.'
  },
  {
    id: 22,
    name: 'Fried Chicken',
    category: 'Chicken',
    price: 5000,
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600',
    description: 'Crispy fried chicken with delicious seasoning.'
  },
  {
    id: 23,
    name: 'Chicken Wings',
    category: 'Chicken',
    price: 5500,
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=600',
    description: 'Tasty chicken wings served with special sauce.'
  },

  // SNACKS
  {
    id: 24,
    name: 'Chicken Shawarma',
    category: 'Snacks',
    price: 4000,
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600',
    description: 'Fresh chicken shawarma with vegetables and sauce.'
  },
  {
    id: 25,
    name: 'Meat Pie',
    category: 'Snacks',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=600',
    description: 'Freshly baked Nigerian meat pie.'
  },
  {
    id: 26,
    name: 'Sausage Roll',
    category: 'Snacks',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600',
    description: 'Golden pastry filled with tasty sausage.'
  },
  {
    id: 27,
    name: 'French Fries',
    category: 'Snacks',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600',
    description: 'Crispy golden fries served with ketchup.'
  },

  // PASTA
  {
    id: 28,
    name: 'Spaghetti Bolognese',
    category: 'Pasta',
    price: 5000,
    image: 'https://images.unsplash.com/photo-1556761223-4c4282c73f77?w=600',
    description: 'Spaghetti served with rich meat sauce.'
  },
  {
    id: 29,
    name: 'Creamy Alfredo Pasta',
    category: 'Pasta',
    price: 6000,
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600',
    description: 'Creamy pasta with chicken and parmesan.'
  },
  {
    id: 30,
    name: 'Jollof Spaghetti',
    category: 'Pasta',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=600',
    description: 'Nigerian-style spaghetti cooked in pepper sauce.'
  },

  // DRINKS
  {
    id: 31,
    name: 'Fresh Orange Juice',
    category: 'Drinks',
    price: 2000,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600',
    description: 'Refreshing freshly prepared orange juice.'
  },
  {
    id: 32,
    name: 'Strawberry Smoothie',
    category: 'Drinks',
    price: 3000,
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600',
    description: 'Fresh strawberry smoothie.'
  },
  {
    id: 33,
    name: 'Chocolate Milkshake',
    category: 'Drinks',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600',
    description: 'Rich and creamy chocolate milkshake.'
  },
  {
    id: 34,
    name: 'Pineapple Juice',
    category: 'Drinks',
    price: 2000,
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=600',
    description: 'Fresh and refreshing pineapple juice.'
  },

  // DESSERTS
  {
    id: 35,
    name: 'Chocolate Cake',
    category: 'Desserts',
    price: 3000,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600',
    description: 'Rich chocolate cake with smooth frosting.'
  },
  {
    id: 36,
    name: 'Vanilla Ice Cream',
    category: 'Desserts',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600',
    description: 'Creamy vanilla ice cream.'
  },
  {
    id: 37,
    name: 'Pancakes',
    category: 'Desserts',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=600',
    description: 'Fluffy pancakes served with syrup.'
  }
]

export default foods
