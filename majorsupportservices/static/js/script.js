// Nutrition Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the dashboard
    initializeDashboard();
    
    // Add event listeners
    addEventListeners();
    
    // Animate progress bars on load
    animateProgressBars();
    
    // Update daily progress
    updateDailyProgress();
    
    // Initialize single page application
    initializeSPA();

    // Initialize recipe tooltips
    initializeRecipeTooltips();
});

// Single Page Application functionality
function initializeSPA() {
    // Navigation items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const label = this.querySelector('.nav-label').textContent;
            // navigateToPage(label);
        });
    });
    
    // Tab switching for measurements
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
    
    // Measurement input controls
    const controlBtns = document.querySelectorAll('.control-btn');
    controlBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            const targetId = this.getAttribute('data-target');
            const input = document.getElementById(targetId);
            
            if (action === 'increment') {
                const step = input.getAttribute('step') || 1;
                input.value = (parseFloat(input.value) + parseFloat(step)).toFixed(1);
            } else if (action === 'decrement') {
                const step = input.getAttribute('step') || 1;
                input.value = Math.max(0, (parseFloat(input.value) - parseFloat(step)).toFixed(1));
            }
        });
    });
    
    // BMI tooltip functionality
    const tooltipTrigger = document.querySelector('.tooltip-trigger');
    const tooltipContent = document.querySelector('.tooltip-content');
    
    if (tooltipTrigger && tooltipContent) {
        let tooltipTimeout;
        
        tooltipTrigger.addEventListener('mouseenter', function() {
            clearTimeout(tooltipTimeout);
            tooltipContent.style.opacity = '1';
            tooltipContent.style.visibility = 'visible';
        });
        
        tooltipTrigger.addEventListener('mouseleave', function() {
            tooltipTimeout = setTimeout(() => {
                tooltipContent.style.opacity = '0';
                tooltipContent.style.visibility = 'hidden';
            }, 100);
        });
        
        tooltipContent.addEventListener('mouseenter', function() {
            clearTimeout(tooltipTimeout);
        });
        
        tooltipContent.addEventListener('mouseleave', function() {
            tooltipContent.style.opacity = '0';
            tooltipContent.style.visibility = 'hidden';
        });
    }
    
    // Donut chart functionality
    initializeDonutChart();
    
    // Unit toggle functionality
    const unitToggles = document.querySelectorAll('.unit-toggle input[type="radio"]');
    unitToggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const inputGroup = this.closest('.input-group');
            const input = inputGroup.querySelector('.measurement-input');
            const currentValue = parseFloat(input.value);
            
            if (this.name === 'height-unit') {
                if (this.value === 'ft' && input.value) {
                    // Convert cm to ft
                    input.value = (currentValue / 30.48).toFixed(2);
                } else if (this.value === 'cm' && input.value) {
                    // Convert ft to cm
                    input.value = Math.round(currentValue * 30.48);
                }
            } else if (this.name === 'weight-unit') {
                if (this.value === 'lbs' && input.value) {
                    // Convert kg to lbs
                    input.value = (currentValue * 2.20462).toFixed(1);
                } else if (this.value === 'kg' && input.value) {
                    // Convert lbs to kg
                    input.value = (currentValue / 2.20462).toFixed(1);
                }
            }
        });
    });


    const editFoodBtns = document.querySelectorAll('.edit-food-btn');
    editFoodBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const foodItem = this.closest('.food-item');
            const foodName = foodItem.querySelector('.food-name').textContent;
            console.log(`Editing ${foodName}`);
            // Here you would typically open an edit modal
        });
    });
    
    
    
    
    // Recipes functionality
    const categoryTabs = document.querySelectorAll('.category-tab');
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            categoryTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            // console.log(`Filtering recipes by category: ${category}`);
            if (category == 'fnri')
            {
                document.querySelector('.recipes-section').setAttribute('style','display:none;');
                document.querySelector('.recipes-fnri-section').setAttribute('style','display:block;');
            }else{
                document.querySelector('.recipes-section').removeAttribute('style','display:block;');
                document.querySelector('.recipes-fnri-section').setAttribute('style','display:none;');
            }
            // Here you would filter recipes based on category
        });
    });

    const filterBtn = document.querySelector('.filter-btn');
    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            console.log('Filter button clicked');
            // Here you would open a filter modal
        });
    }
    
    const likeBtns = document.querySelectorAll('.like-btn');
    likeBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const isLiked = this.getAttribute('data-liked') === 'true';
            this.setAttribute('data-liked', !isLiked);
            this.classList.toggle('liked', !isLiked);
            console.log(`Recipe ${isLiked ? 'unliked' : 'liked'}`);
        });
    });
    
    const bookmarkBtns = document.querySelectorAll('.bookmark-btn');
    bookmarkBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const isBookmarked = this.getAttribute('data-bookmarked') === 'true';
            this.setAttribute('data-bookmarked', !isBookmarked);
            this.classList.toggle('bookmarked', !isBookmarked);
            console.log(`Recipe ${isBookmarked ? 'removed from bookmarks' : 'bookmarked'}`);
        });
    });
    
    const viewRecipeBtns = document.querySelectorAll('.view-recipe-btn');
    viewRecipeBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const recipeCard = this.closest('.recipe-card');
            const recipeId = recipeCard.getAttribute('data-recipe-id');
            const modalDesc = this.getAttribute('data-action');
            console.log(`Viewing recipe: ${recipeId}`);
            openRecipeModal(recipeId);

            switch (modalDesc)
            {
                case 'view-fnri-recipe':
                    document.querySelector('.modal-footer').setAttribute('style','display:none;'); 
                    break;
                default:
                    document.querySelector('.modal-footer').removeAttribute('style','display:none;');
            }
        });
    });
    
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            console.log('Downloading weekly menu plan');
            // Here you would trigger the download
        });
    }
    
    // const searchInput = document.querySelector('.search-input');
    // if (searchInput) {
    //     searchInput.addEventListener('input', function() {
    //         const query = this.value;
    //         console.log(`Searching for: ${query}`);
    //         // Here you would filter recipes based on search query
    //     });
    // }
}

function navigateToPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.main-content');
    pages.forEach(page => {
        page.style.display = 'none';
        page.classList.remove('active');
    });    
    
    // Remove active class from all nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected page
    let targetPage;
    switch(pageName) {
        case 'Dashboard':
            targetPage = document.querySelector('.main-content:not(.profile-page)');
            break;
        case 'Profile':
            targetPage = document.getElementById('profile-page');
            break;
        case 'Food Log':
            targetPage = document.getElementById('food-log-page');
            break;
        case 'Recipes':
            targetPage = document.getElementById('recipes-page');
            break;
        case 'Landing':
            window.location.href = 'landing.html';
            return;
        default:
            targetPage = document.querySelector('.main-content:not(.profile-page)');
    }
    
    if (targetPage) {
        targetPage.style.display = 'block';
        targetPage.classList.add('active');
    }
    
    // Update active nav item
    const activeNavItem = Array.from(navItems).find(item => 
        item.querySelector('.nav-label').textContent === pageName
    );
    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }
    
    // Update header content based on page
    // updateHeaderContent(pageName);
}

function updateHeaderContent(pageName) {
    const header = document.querySelector('.header');
    const welcomeSection = header.querySelector('.welcome-section');
    const notificationIcon = header.querySelector('.notification-icon');

    
    if (pageName === 'Profile') {
        // Show profile-specific header content
        welcomeSection.innerHTML = `
            <h1 class="welcome-title">Profile</h1>
            <p class="welcome-subtitle">Track your body measurements and requirements</p>
        `;
        notificationIcon.innerHTML = `
            <button class="contact-rnd-btn">Contact RND</button>
        `;
    } else if (pageName === 'Food Log') {
        // Show food log-specific header content
        welcomeSection.innerHTML = `
            <h1 class="welcome-title">Food Diary</h1>
            <p class="welcome-subtitle">Track your daily nutrition intake</p>
        `;
        notificationIcon.innerHTML = `
            <button class="contact-rnd-btn">Contact RND</button>
        `;
    } else if (pageName === 'Recipes') {
        // Show recipes-specific header content
        welcomeSection.innerHTML = `
            <h1 class="welcome-title">Recipes</h1>
            <p class="welcome-subtitle">Discover healthy and delicious meal ideas</p>
        `;
        notificationIcon.innerHTML = `
            <button class="contact-rnd-btn">Contact RND</button>
        `;
    } else {
        // Show dashboard-specific header content
        welcomeSection.innerHTML = `
            <h1 class="welcome-title">Welcome back, Maria!</h1>
            <p class="welcome-subtitle">Let's track your nutrition journey today</p>
        `;
        notificationIcon.innerHTML = `
            <div class="notification-badge">
                <span class="flame-icon">🔥</span>
                <span class="notification-count">5</span>
            </div>
        `;
    }
}

function switchTab(tabName) {
    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.style.display = 'none';
        content.classList.remove('active');
    });
    
    // Show selected tab
    const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
    const activeContent = document.getElementById(`${tabName}-tab`);
    
    if (activeTab && activeContent) {
        activeTab.classList.add('active');
        activeContent.style.display = 'block';
        activeContent.classList.add('active');
    }
}








function initializeDashboard() {
    // Set current date for daily checkmarks
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // Update current day indicator
    const dayCheckmarks = document.querySelectorAll('.day-checkmark');
    dayCheckmarks.forEach((checkmark, index) => {
        checkmark.classList.remove('current');
        if (index === dayOfWeek - 1) { // Adjust for Sunday being 0
            checkmark.classList.add('current');
        }
    });
}

function addEventListeners() {
    // Navigation items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
            
            // Handle navigation (in a real app, this would navigate to different pages)
            const label = this.querySelector('.nav-label').textContent;
            console.log(`Navigating to: ${label}`);
        });
    });
    
    // Recipe buttons
    const recipeButtons = document.querySelectorAll('.recipe-button');
    recipeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const recipeCard = this.closest('.recipe-card');
            const recipeId = recipeCard.getAttribute('data-recipe-id');
            console.log(`Viewing recipe: ${recipeId}`);
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
                openRecipeModal(recipeId);
            }, 150);
        });
    });
    
    // Progress cards hover effects and click handlers
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Weight card click handler - redirect to profile
    const weightCard = document.querySelector('.weight-card');
    if (weightCard) {
        weightCard.addEventListener('click', function() {
            let profileUrl = this.getAttribute('data-url');
            window.open(profileUrl, '_self');
        });
        weightCard.style.cursor = 'pointer';
    }
    
    // Calorie card click handler - redirect to food log
    // const calorieCard = document.querySelector('.calorie-card');
    // if (calorieCard) {
    //     calorieCard.addEventListener('click', function() {
    //         let dietaryUrl = this.getAttribute('data-url');
    //         window.open(dietaryUrl, '_self');
    //         // navigateToPage('Food Log');
    //     });
    //     calorieCard.style.cursor = 'pointer';
    // }
    
    // Recommendations card click handler - redirect to recipes
    const recommendationsCard = document.querySelector('.recommendations-card');
    if (recommendationsCard) {
        recommendationsCard.addEventListener('click', function() {
            let recipesUrl = this.getAttribute('data-url');
            window.open(recipesUrl, '_self');
            // navigateToPage('Recipes');
        });
        recommendationsCard.style.cursor = 'pointer';
        
        // Prevent individual recipe cards from triggering the parent click
        const recipeCards = recommendationsCard.querySelectorAll('.recipe-card');
        recipeCards.forEach(card => {
            card.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        });
    }
}

function animateProgressBars() {
    // Animate weight progress bar
    const weightProgress = document.querySelector('.weight-progress');
    if (weightProgress) {
        setTimeout(() => {
            weightProgress.style.width = '85%';
        }, 500);
    }
    
    // Animate calorie progress bar
    const calorieProgress = document.querySelector('.calorie-progress');
    if (calorieProgress) {
        setTimeout(() => {
            calorieProgress.style.width = '80%';
        }, 700);
    }
    
    // Animate weekly progress bar
    const weeklyProgress = document.querySelector('.weekly-progress');
    if (weeklyProgress) {
        setTimeout(() => {
            weeklyProgress.style.width = '75%';
        }, 900);
    }
}

function updateDailyProgress() {
    // Simulate real-time updates
    const progressValues = {
        weight: 85,
        calories: 80,
        weekly: 75
    };
    
    // Update progress bars with smooth animation
    Object.keys(progressValues).forEach((key, index) => {
        setTimeout(() => {
            const progressBar = document.querySelector(`.${key}-progress`);
            if (progressBar) {
                progressBar.style.width = `${progressValues[key]}%`;
            }
        }, (index + 1) * 200);
    });
}

// Utility functions for future enhancements
function updateWeight(newWeight) {
    const weightElement = document.querySelector('.weight-card .main-value');
    if (weightElement) {
        weightElement.textContent = `${newWeight} kg`;
    }
}

function updateCalories(consumed, goal = 1800) {
    const caloriesElement = document.querySelector('.calorie-card .main-value');
    const percentage = Math.round((consumed / goal) * 100);
    
    if (caloriesElement) {
        caloriesElement.textContent = consumed.toLocaleString();
    }
    
    const percentageBadge = document.querySelector('.percentage-badge');
    if (percentageBadge) {
        percentageBadge.textContent = `• ${percentage}%`;
    }
    
    const calorieProgress = document.querySelector('.calorie-progress');
    if (calorieProgress) {
        calorieProgress.style.width = `${Math.min(percentage, 100)}%`;
    }
}

function updateWeeklyProgress(completedDays, totalDays = 7) {
    const percentage = Math.round((completedDays / totalDays) * 100);
    const trackPercentage = document.querySelector('.track-percentage');
    const weeklyProgress = document.querySelector('.weekly-progress');
    const completionMessage = document.querySelector('.completion-message .message');
    
    if (trackPercentage) {
        trackPercentage.textContent = `${percentage}% on track`;
    }
    
    if (weeklyProgress) {
        weeklyProgress.style.width = `${percentage}%`;
    }
    
    if (completionMessage) {
        completionMessage.textContent = `${completedDays} out of ${totalDays} days completed this week! 🎉`;
    }
}

// Add smooth scrolling for better UX
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        // Add focus styles for keyboard navigation
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    // Remove focus styles when using mouse
    document.body.classList.remove('keyboard-navigation');
});

// Add loading state simulation
function simulateLoading() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Initialize loading animation
setTimeout(simulateLoading, 100);

// Add responsive behavior for window resize
window.addEventListener('resize', function() {
    // Recalculate layout on resize
    const isMobile = window.innerWidth < 768;
    const bottomNav = document.querySelector('.bottom-nav');
    
    if (bottomNav) {
        bottomNav.style.display = isMobile ? 'flex' : 'none';
    }
});

    // Add touch support for mobile
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Add touch feedback for buttons
        const buttons = document.querySelectorAll('button, .nav-item');
        buttons.forEach(button => {
            button.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            button.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
    }
    
    // Add click event listener to Maria user profile card
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        userProfile.addEventListener('click', function() {
            let profileUrl = this.getAttribute('data-url');
            window.open(profileUrl, '_self');
        });
        userProfile.style.cursor = 'pointer';
    }


    //Add click event listener to Dashboard nav item (DESKTOP UI)
    const dashboardTab = document.getElementById('dashboard-page');
    if(dashboardTab) {
        dashboardTab.addEventListener('click', function() {
            let dashboardUrl = this.getAttribute('data-url');
            window.open(dashboardUrl, '_self');
        });
        dashboardTab.style.cursor = 'pointer';
    }

    //Add click event listener to Profile nav item (DESKTOP UI)
    const profileTab = document.getElementById('profile-page');
    if(profileTab) {
        profileTab.addEventListener('click', function() {
            let profileUrl = this.getAttribute('data-url');
            window.open(profileUrl, '_self');
            loadingPage();
        });
        profileTab.style.cursor = 'pointer';
    }

    //Add click event listener to Dietary nav item (DESKTOP UI)
    const dietaryTab = document.getElementById('dietary-page');
    if(dietaryTab) {
        dietaryTab.addEventListener('click', function() {
            let dietaryUrl = this.getAttribute('data-url');
            window.open(dietaryUrl, '_self');
        });
        dietaryTab.style.cursor = 'pointer';
    }

    //Add click event listener to Food Recommender nav item (DESKTOP UI)
    const foodRecommenderTab = document.getElementById('recipes-page');
    if(foodRecommenderTab) {
        foodRecommenderTab.addEventListener('click', function() {
            let foodRecommenderUrl = this.getAttribute('data-url');
            window.open(foodRecommenderUrl, '_self');
        });
        foodRecommenderTab.style.cursor = 'pointer';
    }

    //Add click event listener to Admin Page nav item (DESKTOP UI)
    const adminTab = document.getElementById('admin-page');
    if(adminTab) {
        adminTab.addEventListener('click', function() {
            let adminUrl = this.getAttribute('data-url');
            window.open(adminUrl, '_self');
        });
        adminTab.style.cursor = 'pointer';
    }


    //Add click event listener to Dashboard nav item (DESKTOP UI)
    const dashboardTabmobile = document.getElementById('dashboard-page-mobile');
    if(dashboardTabmobile) {
        dashboardTabmobile.addEventListener('click', function() {
            let dashboardUrl = this.getAttribute('data-url');
            window.open(dashboardUrl, '_self');
        });
        dashboardTabmobile.style.cursor = 'pointer';
    }

    //Add click event listener to Profile nav item (DESKTOP UI)
    const profileTabmobile = document.getElementById('profile-page-mobile');
    if(profileTabmobile) {
        profileTabmobile.addEventListener('click', function() {
            let profileUrl = this.getAttribute('data-url');
            window.open(profileUrl, '_self');
        });
        profileTabmobile.style.cursor = 'pointer';
    }

    //Add click event listener to Dietary nav item (DESKTOP UI)
    const dietaryTabmobile = document.getElementById('dietary-page-mobile');
    if(dietaryTabmobile) {
        dietaryTabmobile.addEventListener('click', function() {
            let dietaryUrl = this.getAttribute('data-url');
            window.open(dietaryUrl, '_self');
        });
        dietaryTabmobile.style.cursor = 'pointer';
    }

    //Add click event listener to Food Recommender nav item (DESKTOP UI)
    const foodRecommenderTabmobile = document.getElementById('recipes-page-mobile');
    if(foodRecommenderTabmobile) {
        foodRecommenderTabmobile.addEventListener('click', function() {
            let foodRecommenderUrl = this.getAttribute('data-url');
            window.open(foodRecommenderUrl, '_self');
        });
        foodRecommenderTabmobile.style.cursor = 'pointer';
    }

    //Add click event listener to Food Recommender nav item (DESKTOP UI)
    const adminTabmobile = document.getElementById('admin-page-mobile');
    if(adminTabmobile) {
        adminTabmobile.addEventListener('click', function() {
            let adminUrl = this.getAttribute('data-url');
            window.open(adminUrl, '_self');
            // console.log("Admin page is not available on mobile view.");
        });
        adminTabmobile.style.cursor = 'pointer';
    }

    //Add click to the desktop account settings icon
    const accountSettingsIcon = document.getElementById('desktopAccountsettings');
    if(accountSettingsIcon) {
        accountSettingsIcon.addEventListener('click', function() {
            let settingsUrl = this.getAttribute('data-url');
            window.open(settingsUrl, '_self');
        });
        accountSettingsIcon.style.cursor = 'pointer';
    }

    //Add click to the mobile account settings button
    const accountSettingsIconmobile = document.getElementById('account-settings-btn');
    if(accountSettingsIconmobile) {
        accountSettingsIconmobile.addEventListener('click', function() {
            let settingsUrl = this.getAttribute('data-url');
            window.open(settingsUrl, '_self');
        });
        accountSettingsIconmobile.style.cursor = 'pointer';
    }



// Donut Chart Functions
function initializeDonutChart() {
    const donutSegments = document.querySelectorAll('.donut-segment');
    const legendItems = document.querySelectorAll('.legend-item');
    
    // Add click handlers to donut segments
    donutSegments.forEach((segment, index) => {
        segment.addEventListener('click', function() {
            highlightSegment(index);
        });
    });
    
    // Add click handlers to legend items
    legendItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            highlightSegment(index);
        });
        
        // Add hover effects
        item.addEventListener('mouseenter', function() {
            highlightSegment(index, true);
        });
        
        item.addEventListener('mouseleave', function() {
            resetHighlights();
        });
    });
}

function highlightSegment(index, isHover = false) {
    const donutSegments = document.querySelectorAll('.donut-segment');
    const legendItems = document.querySelectorAll('.legend-item');
    
    // Reset all segments
    donutSegments.forEach(segment => {
        segment.style.opacity = '0.3';
        segment.style.strokeWidth = '8';
    });
    
    // Reset all legend items
    legendItems.forEach(item => {
        item.style.opacity = '0.3';
    });
    
    // Highlight selected segment
    if (donutSegments[index]) {
        donutSegments[index].style.opacity = '1';
        donutSegments[index].style.strokeWidth = isHover ? '10' : '12';
    }
    
    if (legendItems[index]) {
        legendItems[index].style.opacity = '1';
    }
}

function resetHighlights() {
    const donutSegments = document.querySelectorAll('.donut-segment');
    const legendItems = document.querySelectorAll('.legend-item');
    
    donutSegments.forEach(segment => {
        segment.style.opacity = '1';
        segment.style.strokeWidth = '8';
    });
    
    legendItems.forEach(item => {
        item.style.opacity = '1';
    });
}

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updateWeight,
        updateCalories,
        updateWeeklyProgress,
        smoothScrollTo,
        initializeDonutChart
    };
}

function toggleUserDropdown() {
    const dropdownMenu = document.getElementById('userDropdownMenu');
    dropdownMenu.classList.toggle('show');
    console.log('Toggled user dropdown menu');
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.querySelector('.user-profile.dropdown');
    const dropdownMenu = document.getElementById('userDropdownMenu');
    
    if (!dropdown.contains(event.target)) {
        dropdownMenu.classList.remove('show');
    }
});


 // Recipe modal event listeners
const modal = document.getElementById('recipe-modal');
if (modal) {
    // Close modal when clicking overlay or close buttons
    const closeElements = modal.querySelectorAll('[data-action="close-modal"]');
    closeElements.forEach(element => {
        element.addEventListener('click', function() {
            closeRecipeModal();
        });
    });

    // Close modal when clicking outside the content area
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('modal-overlay')) {
            closeRecipeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeRecipeModal();
        }
    });

    // Save recipe button
    const saveRecipeBtn = modal.querySelector('[data-action="save-recipe"]');
    if (saveRecipeBtn) {
        saveRecipeBtn.addEventListener('click', function() {
            const recipeName = document.getElementById('modal-recipe-name').textContent;
            const recipeId = this.getAttribute('data-recipe-id');
            
            fetch('/saved_recipes', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'X-Requested-With':'XMLHttpRequest'
                },
                body:JSON.stringify({recipe_key: recipeId})
            }).then(response => {
                return response.json();
            }).then(data =>  {
                console.log(`Recipe saved: ${recipeName} (ID: ${recipeId})`);
                // Provide user feedback
                const originalText = saveRecipeBtn.textContent;
                saveRecipeBtn.textContent = 'Saved!';
                saveRecipeBtn.disabled = true;
                saveRecipeBtn.style.background = '#10b981';
                setTimeout(() => {
                    saveRecipeBtn.textContent = originalText;
                    saveRecipeBtn.disabled = false;
                    saveRecipeBtn.style.background = '';
                }, 2000);
            });
        });
    }
}


// Sample Recipe Data
const sampleRecipes = (recipeId) => {
    fetch('/view_recipe_details', {
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'X-Requested-With':'XMLHttpRequest'
        },
        body:JSON.stringify({recipe_key: recipeId})
    }).then(response => {
        return response.json();
    }).then(data =>  {
          return data;
    });

};


// Recipe Modal functionality
function openRecipeModal(recipeId) {

    //recipe details fetch
    fetch('/view_recipe_details', {
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'X-Requested-With':'XMLHttpRequest'
        },
        body:JSON.stringify({recipe_key: recipeId})
    }).then(response => {
        return response.json();
    }).then(data =>  {
        return data;
    }).then(recipe => {
        populateRecipeModal(recipeId, recipe);
    });

    //ingredient details fetch
    fetch('/view_ingredient_details', {
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'X-Requested-With':'XMLHttpRequest'
        },
        body:JSON.stringify({recipe_key: recipeId})
    }).then(response => {
        return response.json();
    }).then(data =>  {
        return data;
    }).then(ingredient => {
        populateIngredientModal(recipeId, ingredient);
    });
}

// helper: format decimal weight as fraction (e.g. 1.25 -> "1 1/4")
function formatWeightAsFraction(value, maxDenominator = 16) {
    if (value === null || value === undefined || value === '') return '';
    const num = parseFloat(value);
    if (Number.isNaN(num)) return value;

    const sign = num < 0 ? '-' : '';
    const absNum = Math.abs(num);
    const integerPart = Math.floor(absNum);
    const frac = absNum - integerPart;

    // if effectively integer, return integer
    if (Math.abs(frac) < 1e-8) {
        return sign + integerPart;
    }

    // find best fraction approximation with denominator up to maxDenominator
    let bestNum = 0, bestDen = 1, bestDiff = Infinity;
    for (let den = 1; den <= maxDenominator; den++) {
        const n = Math.round(frac * den);
        const diff = Math.abs(frac - n / den);
        if (diff < bestDiff) {
            bestDiff = diff;
            bestNum = n;
            bestDen = den;
        }
    }

    if (bestNum === 0) {
        return sign + integerPart;
    }

    // reduce fraction
    const gcd = (a, b) => b ? gcd(b, a % b) : a;
    const g = gcd(bestNum, bestDen);
    const n = bestNum / g;
    const d = bestDen / g;

    if (integerPart === 0) {
        return sign + `${n}/${d}`;
    }
    return sign + `${integerPart} ${n}/${d}`;
}



// Populate INGREDIENT DETAILS
function populateIngredientModal(recipeId, ingredient)
{
    if (!ingredient) {
        console.error('Ingredient not found:', recipeId);
        return;
    }

    
    // Populate ingredients
    const ingredientsContainer = document.getElementById('modal-ingredients');
    ingredientsContainer.innerHTML = '';
    ingredient.result.forEach(ingredient => {
        const ingredientElement = document.createElement('div');
        ingredientElement.className = 'ingredient-item';
        const displayWeight = formatWeightAsFraction(ingredient.weight);
        
        ingredientElement.innerHTML = `
            <div class="ingredient-name">${ingredient.foodname}</div>
            <div class="ingredient-measures">
                <span class="ingredient-weight">${displayWeight}&nbsp${ingredient.unit}</span>
            </div>
        `;
        ingredientsContainer.appendChild(ingredientElement);
    });

     // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';




}


//POPULATE RECIPE DETAILS
function populateRecipeModal(recipeId, recipe) {
    if (!recipe) {
        console.error('Recipe not found:', recipeId);
        return;
    }

    // Populate modal with recipe data
    const rawName = (recipe?.result?.recipe_name) || '';
    const firstToken = rawName.split(' ')[0] || '';
    const displayName = (/^\d+$/.test(firstToken))
        ? rawName.split(' ').slice(1).join(' ').trim()
        : rawName;

    // Populate modal with recipe data
    document.getElementById('modal-recipe-name').textContent = displayName;
    document.getElementById('modal-recipe-image').src = 'images/recipes_validated/' + recipe.result.recipe_pic;
    // Use a client-side relative path (url_for is a server-side Flask helper and not available in browser)
    const modalImage = document.getElementById('modal-recipe-image');
    if (modalImage) {
        console.log('Recipe image:', recipe.result.recipe_pic);
        const pic = recipe.result.recipe_pic == null ? 'food.jpg' : recipe.result.recipe_pic;
        modalImage.src = `/static/images/recipes_validated/${encodeURIComponent(pic)}`;
        modalImage.alt = recipe.result.recipe_name || 'Recipe image';
    }
    document.getElementById('modal-cooking-time').textContent = recipe.result.cook_time;
    document.getElementById('modal-serving-size').textContent = recipe.result.servingsize;
    document.getElementById('modal-servings').textContent = parseFloat(recipe.result.yield);
    document.getElementById('modal-calories').textContent = recipe.result.energy;
    document.getElementById('save-recipe').setAttribute('data-recipe-id', recipeId);

    // Populate procedure

    let procedure = recipe.result.cprocedure.split('. ').slice(1).join('.|').split('|');
    if (recipe.result.cprocedure) {
        const procedureContainer = document.getElementById('modal-procedure');
        procedureContainer.innerHTML = '';
        procedure.forEach((step, index) => {
            const stepElement = document.createElement('div');
           stepElement.className = 'procedure-step';
            stepElement.innerHTML = `
                <div class="step-number">${index + 1}</div>
                <div class="step-content">${step}</div>
            `;
            procedureContainer.appendChild(stepElement);
        });
    }else{
        console.log('no procedure')
        const procedureContainer = document.getElementById('modal-procedure');
        procedureContainer.innerHTML = '';
        const noProcedureElement = document.createElement('div');
        noProcedureElement.innerHTML = `<div style="text-align:center">No procedure found for this recipe.</div>`;
        procedureContainer.appendChild(noProcedureElement);
    }
    const procText = (recipe?.result?.cprocedure || '').trim();
    const procedureContainer = document.getElementById('modal-procedure');
    procedureContainer.innerHTML = '';

    if (!procText) {
        console.log('no procedure');
        const noProcedureElement = document.createElement('div');
        noProcedureElement.innerHTML = `<div style="text-align:center">No procedure found for this recipe.</div>`;
        procedureContainer.appendChild(noProcedureElement);
    } else {
        // Split by numbered steps like "1. " or "2) " (handles newlines too),
        // then strip the leading numbers and trim each step.
        const procedure = procText
            .replace(/\r?\n/g, ' ')
            .split(/(?=\d+[\.\)]\s)/)                // split before "1. " or "1) "
            .map(s => s.replace(/^\d+[\.\)]\s*/, '')) // remove leading number and punctuation
            .map(s => s.trim())
            .filter(Boolean);
        procedureContainer.innerHTML = '';
        procedure.forEach((step, index) => {
            const stepElement = document.createElement('div');
            stepElement.className = 'procedure-step';
          stepElement.innerHTML = `
                <div class="step-number">${index + 1}</div>
                <div class="step-content">${step}</div>
            `;
           procedureContainer.appendChild(stepElement);
        });
    }
    
}

function closeRecipeModal() {
    const modal = document.getElementById('recipe-modal');
    if (!modal) return;

    // Hide modal
    modal.classList.remove('active');
    document.body.style.overflow = '';

    // Clear modal content to avoid stale data when reopened
    const clearText = id => {
        const el = document.getElementById(id);
        if (el) el.textContent = '';
    };
    const clearHTML = id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = '';
    };

    clearText('modal-recipe-name');
    const modalImage = document.getElementById('modal-recipe-image');
    if (modalImage) {
        modalImage.src = '';
        modalImage.alt = '';
    }
    clearText('modal-cooking-time');
    clearText('modal-serving-size');
    clearText('modal-servings');
    clearText('modal-calories');

    // Clear procedure and ingredients lists
    clearHTML('modal-procedure');
    clearHTML('modal-ingredients');
}

function loadingPage()
{
    document.addEventListener('DOMContentLoaded', function() {
        var overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.style.display = 'block';
        }
    });

    window.addEventListener('load', function() {
        setTimeout(function() {
            var overlay = document.getElementById('loading-overlay');
            if (overlay) {
                overlay.style.display = 'none';
            }
        }, 600); // 600ms delay before hiding the overlay
    });

}







// Initialize recipe action button tooltips
function initializeRecipeTooltips() {
    const actionBtns = document.querySelectorAll('.action-btn[data-tooltip]');
    actionBtns.forEach(btn => {
        const tooltipText = btn.getAttribute('data-tooltip');
        
        // Create tooltip element
        const tooltip = document.createElement('div');
        tooltip.className = 'action-tooltip';
        tooltip.textContent = tooltipText;
        btn.appendChild(tooltip);
        
        let tooltipTimeout;
        
        // Show tooltip on hover (desktop)
        btn.addEventListener('mouseenter', function() {
            clearTimeout(tooltipTimeout);
            tooltip.style.opacity = '1';
            tooltip.style.visibility = 'visible';
            this.classList.add('tooltip-active');
        });
        
        btn.addEventListener('mouseleave', function() {
            tooltipTimeout = setTimeout(() => {
                tooltip.style.opacity = '0';
                tooltip.style.visibility = 'hidden';
                this.classList.remove('tooltip-active');
            }, 100);
        });
        
        // Touch events for mobile/Android
        btn.addEventListener('touchstart', function(e) {
            e.stopPropagation();
            clearTimeout(tooltipTimeout);
            tooltip.style.opacity = '1';
            tooltip.style.visibility = 'visible';
            this.classList.add('tooltip-active');
        });
        
        btn.addEventListener('touchend', function(e) {
            e.stopPropagation();
            // Keep tooltip visible for a moment on touch devices
            tooltipTimeout = setTimeout(() => {
                tooltip.style.opacity = '0';
                tooltip.style.visibility = 'hidden';
                this.classList.remove('tooltip-active');
            }, 2000);
        });
        
        // Update like button icon and state
        if (btn.classList.contains('like-btn')) {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const isLiked = this.getAttribute('data-liked') === 'true';
                this.setAttribute('data-liked', !isLiked);
                this.classList.toggle('active', !isLiked);
                
                // Update icon color
                const icon = this.querySelector('i');
                if (!isLiked) {
                    icon.style.color = '#ef4444';
                } else {
                    icon.style.color = '';
                }
                
                // Ensure recipe content remains visible
                const recipeCard = this.closest('.recipe-card');
                if (recipeCard) {
                    const recipeContent = recipeCard.querySelector('.recipe-content');
                    if (recipeContent) {
                        recipeContent.style.zIndex = '1';
                        recipeContent.style.position = 'relative';
                    }
                }
            });
        }
        
        // Update munching button state
        if (btn.classList.contains('munching-btn')) {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const isMunched = this.getAttribute('data-munched') === 'true';
                this.setAttribute('data-munched', !isMunched);
                this.classList.toggle('active', !isMunched);
            });
        }
    });
    
    // Initialize info icon tooltips
    const infoIcons = document.querySelectorAll('.info-icon[data-tooltip]');
    infoIcons.forEach(icon => {
        let tooltipTimeout;
        
        
        // Mouse events for desktop
        icon.addEventListener('mouseenter', function() {
            clearTimeout(tooltipTimeout);
            this.classList.add('tooltip-active');
        });
        
        icon.addEventListener('mouseleave', function() {
            tooltipTimeout = setTimeout(() => {
                this.classList.remove('tooltip-active');
            }, 100);
        });
        
        // Touch events for mobile/Android
        icon.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            clearTimeout(tooltipTimeout);
            this.classList.add('tooltip-active');
        });
        
        icon.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            // Keep tooltip visible for a moment on touch devices
            tooltipTimeout = setTimeout(() => {
                this.classList.remove('tooltip-active');
            }, 2000);
        });
    });
}







