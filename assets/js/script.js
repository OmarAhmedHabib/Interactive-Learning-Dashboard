$(document).ready(function () {
    // Sample lessons data
    const lessons = [
        {
            id: 1,
            title: "Introduction to Web Development",
            description: "Learn the basics of HTML, CSS, and JavaScript to build your first web page.",
            content: `
                <h5 class="text-xl font-semibold mb-4">Welcome to Web Development!</h5>
                <p class="mb-4">In this lesson, you'll learn:</p>
                <ul class="list-disc list-inside mb-4 space-y-2">
                    <li>Understanding HTML structure</li>
                    <li>CSS styling fundamentals</li>
                    <li>JavaScript basics for interactivity</li>
                </ul>
                <div class="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
                    <p class="text-sm text-blue-800 dark:text-blue-200">
                        <strong>Tip:</strong> Practice by creating a simple "Hello World" page!
                    </p>
                </div>
            `
        },
        {
            id: 2,
            title: "Responsive Design Principles",
            description: "Master the art of creating websites that look great on all devices.",
            content: `
                <h5 class="text-xl font-semibold mb-4">Responsive Design Essentials</h5>
                <p class="mb-4">Key concepts covered:</p>
                <ul class="list-disc list-inside mb-4 space-y-2">
                    <li>Mobile-first design approach</li>
                    <li>CSS Flexbox and Grid</li>
                    <li>Media queries for different screen sizes</li>
                </ul>
                <div class="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
                    <p class="text-sm text-green-800 dark:text-green-200">
                        <strong>Exercise:</strong> Make a responsive navigation menu!
                    </p>
                </div>
            `
        },
        {
            id: 3,
            title: "JavaScript Fundamentals",
            description: "Understand the basics of JavaScript programming language.",
            content: `
                <h5 class="text-xl font-semibold mb-4">JavaScript Core Concepts</h5>
                <p class="mb-4">What you'll learn:</p>
                <ul class="list-disc list-inside mb-4 space-y-2">
                    <li>Variables and data types</li>
                    <li>Functions and scope</li>
                    <li>DOM manipulation</li>
                    <li>Event handling</li>
                </ul>
                <div class="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg">
                    <p class="text-sm text-yellow-800 dark:text-yellow-200">
                        <strong>Project:</strong> Build an interactive calculator!
                    </p>
                </div>
            `
        },
        {
            id: 4,
            title: "Working with APIs",
            description: "Learn how to fetch and display data from external sources.",
            content: `
                <h5 class="text-xl font-semibold mb-4">API Integration</h5>
                <p class="mb-4">Topics include:</p>
                <ul class="list-disc list-inside mb-4 space-y-2">
                    <li>Understanding REST APIs</li>
                    <li>Fetch API and AJAX</li>
                    <li>Handling JSON data</li>
                    <li>Error handling</li>
                </ul>
                <div class="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg">
                    <p class="text-sm text-purple-800 dark:text-purple-200">
                        <strong>Challenge:</strong> Create a weather app using a weather API!
                    </p>
                </div>
            `
        },
        {
            id: 5,
            title: "Modern JavaScript Frameworks",
            description: "Introduction to React and building component-based applications.",
            content: `
                <h5 class="text-xl font-semibold mb-4">React Basics</h5>
                <p class="mb-4">You'll explore:</p>
                <ul class="list-disc list-inside mb-4 space-y-2">
                    <li>Component architecture</li>
                    <li>State and props</li>
                    <li>JSX syntax</li>
                    <li>Event handling in React</li>
                </ul>
                <div class="bg-red-50 dark:bg-red-900 p-4 rounded-lg">
                    <p class="text-sm text-red-800 dark:text-red-200">
                        <strong>Final Project:</strong> Build a todo list application!
                    </p>
                </div>
            `
        }
    ];

    let completedLessons = new Set();

    // Initialize total lessons count
    $("#total-lessons").text(lessons.length);

    // Function to render lesson cards
    function renderLessons() {
        const container = $("#lessons-container");
        container.empty();

        lessons.forEach(lesson => {
            const lessonCard = `
                <div class="lesson-card bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
                    <div class="p-6">
                        <h4 class="text-xl font-bold text-gray-800 dark:text-white mb-2">${lesson.title}</h4>
                        <p class="text-gray-600 dark:text-gray-300 mb-4">${lesson.description}</p>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-500 dark:text-gray-400">
                                ${lesson.completed ? '✅ Completed' : '📚 Not Started'}
                            </span>
                            <button class="start-lesson bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors" data-id="${lesson.id}">
                                ${lesson.completed ? 'Review' : 'Start'}
                            </button>
                        </div>
                    </div>
                </div>
            `;
            container.append(lessonCard);
        });
    }

    // Function to update progress bar
    function updateProgress() {
        const percentage = (completedLessons.size / lessons.length) * 100;
        $('#progress-bar').css('width', `${percentage}%`);
        $('#progress-text').text(completedLessons.size);
        $('#total-lessons').text(lessons.length);
    }

    // Load lesson content into modal
    function loadLessonContent(id) {
        const lesson = lessons.find(l => l.id === id);
        if (lesson) {
            $("#lesson-title").text(lesson.title);
            $("#lesson-content").html(lesson.content);
            $("#lesson-modal").fadeIn(300);
            $("#complete-lesson").data("id", id);
        }
    }

    // Close modals
    $(document).on('click', '#close-modal, #close-completion', function() {
        $('.modal').fadeOut(300);
    });

    // Start learning button scrolls to lessons
    $("#start-learning").click(function() {
        $('html, body').animate({
            scrollTop: $("#lessons").offset().top - 100
        }, 1000);
    });

    // Handle start lesson button click
    $(document).on('click', '.start-lesson', function() {
        const lessonId = $(this).data('id');
        loadLessonContent(lessonId);
    });

    // Handle complete lesson button click
    $(document).on('click', '#complete-lesson', function() {
        const lessonId = $(this).data('id');
        if (!completedLessons.has(lessonId)) {
            completedLessons.add(lessonId);
            updateProgress();
            $('#lesson-modal').fadeOut(300);
            $('#completion-modal').fadeIn(300);
        }
    });

    // Dark/light mode toggle
    $('#theme-toggle').click(function() {
        $('html').toggleClass('light dark');
        localStorage.setItem('theme', $('html').hasClass('dark') ? 'dark' : 'light');
    });

    // Load theme from localStorage
    function loadTheme() {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            $('html').removeClass('light').addClass('dark');
        } else {
            $('html').removeClass('dark').addClass('light');
        }
    }

    // Mobile menu toggle
    $('#mobile-menu-toggle').click(function() {
        $('#mobile-menu').slideToggle(200);
    });

    // Initialize
    renderLessons();
    updateProgress();
    loadTheme();
});
