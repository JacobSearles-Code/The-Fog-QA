INSERT INTO Users (username, email, hashed_password, user_role)
VALUES
    ('Jacob', 'jacob@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'admin'),
    ('TestUser01', 'tester01@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'tester'),
    ('TestUser02', 'tester02@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldLJZdL17lhWy', 'tester');

INSERT INTO Games (game_title, game_description)
VALUES
    ('Dead by Daylight', 'Asymmetrical multiplayer horror game.'),
    ('Game Test Project', 'An internal test game for QA testing.'),
    ('Example Adventure', 'A fictional adventure game used for testing.');

INSERT INTO Bug_Reports
(title, bug_description, replication_steps, severity, status, platform, game_id, user_id)
VALUES
    (
        'Character gets stuck in wall',
        'The player character can become trapped inside a wall after being pushed into it.',
        '1. Walk toward a wall.\n2. Have another player push your character.\n3. Observe the character becoming stuck.',
        'high', 'open', 'PC', 1, 2
    ),
    (
        'Menu audio plays twice',
        'Opening the settings menu causes the background menu audio to overlap.',
        '1. Launch the game.\n2. Open the settings menu.\n3. Close and reopen it quickly.',
        'low', 'resolved', 'PC', 2, 2
    ),
    (
        'Game crashes on startup',
        'The game closes immediately after displaying the loading screen.',
        '1. Launch the game.\n2. Wait for the loading screen.\n3. Observe the application closing.',
        'critical', 'in-progress', 'Xbox', 3, 3
    ),
    (
        'Incorrect player animation',
        'The character continues playing the running animation while standing still.',
        '1. Start a match.\n2. Move the character.\n3. Release movement controls.\n4. Observe the animation.',
        'medium', 'open', 'PlayStation', 1, 3
    ),
    (
        'Inventory items disappear',
        'Items occasionally disappear from the inventory after changing levels.',
        '1. Collect an inventory item.\n2. Change levels.\n3. Open the inventory.',
        'high', 'in-progress', 'PC', 3, 2
    ),
    (
        'Incorrect text alignment',
        'Some menu text appears outside its intended button boundaries.',
        '1. Launch the game.\n2. Navigate to the main menu.\n3. Open the options screen.',
        'low', 'closed', 'PC', 2, 1
    );

INSERT INTO Comments (report_id, user_id, comment)
VALUES
    (1, 1, 'I have confirmed this issue and started investigating.'),
    (1, 2, 'I can reproduce this consistently on PC.'),
    (2, 1, 'This issue has been fixed in the latest build.'),
    (3, 1, 'Investigating the crash logs now.'),
    (4, 3, 'This also happens when switching characters.'),
    (5, 2, 'The issue seems to happen after loading a new level.');

