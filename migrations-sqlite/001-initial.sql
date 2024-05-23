CREATE TABLE Hiits (
    hiits_id CHAR(36) PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    description TEXT NOT NULL,
    type VARCHAR(20) NOT NULL
);

CREATE TABLE Exercise (
    exercise_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(40) NOT NULL,
    description TEXT NOT NULL,
    exercise_duration INTEGER NOT NULL, 
    rest_duration INTEGER NOT NULL,
    hiit_id INTEGER REFERENCES Hiits(hiits_id)                  
);

INSERT INTO Hiits (hiits_id, name, description, type) 
VALUES 
('5d51f171-afbf-4885-91e3-83f0cc72499d', 'HIIT Quick Blast', 'A fast-paced HIIT workout designed to maximize calorie burn and boost metabolism in a short amount of time', 'default'),
('6bddceaa-8c75-4946-84df-38a4f2abbe79', 'Tabata Torch', 'Based on the Tabata protocol, this workout consists of 20 seconds of intense exercise followed by 10 seconds of rest, repeated for multiple rounds', 'default'),
('8a8f1dd4-5d4f-4e35-951d-27f80d7c0db2', 'Power Plyo HIIT', 'Focuses on explosive, plyometric movements to build power and agility', 'default'),
('c48f1b14-7893-4785-845d-6fbd0b8274f7', 'Total Body Torcher', 'Targets all major muscle groups for a comprehensive full-body workout', 'default'),
('e5fd4c8a-84f8-4f06-8aa1-8b80cb86b43c', 'Cardio Crusher', 'Emphasizes cardiovascular endurance and stamina', 'default'),
('f3a1bf47-5c68-4c31-bba4-af6c86016a4e', 'Sweat Sesh HIIT', 'A sweaty, heart-pumping HIIT workout to challenge your fitness level', 'default'),
('a0258332-7b4c-4974-98b1-83d47c55c192', 'HIIT Fury', 'A high-energy HIIT workout that keeps you moving with minimal rest', 'default'),
('f57e222c-248e-4bfc-af6e-f68d95c0e43d', 'HIIT Inferno', 'A challenging HIIT workout designed to push you to your limits', 'default');

INSERT INTO Exercise (name, description, exercise_duration, rest_duration, hiit_id) VALUES 
('Jumping Jacks', 'Start from a standing position, jump feet out to the sides while raising arms overhead, then return to the starting position. Repeat for a quick and effective workout anytime, anywhere', 60, 60, '5d51f171-afbf-4885-91e3-83f0cc72499d'),
('High knees', 'Simply jog in place while driving knees upwards towards the chest, alternating legs with each repetition. Incorporate high knees into your routine for a dynamic workout that boosts energy and endurance', 45, 60, '5d51f171-afbf-4885-91e3-83f0cc72499d'),
('Burpees', 'Begin in a standing position, then drop into a squat, kick legs back into a plank, perform a push-up, jump feet back to the squat position, and explode upwards into a jump', 60, 60, '5d51f171-afbf-4885-91e3-83f0cc72499d'),
('Mountain climbers', 'Start in a plank position, then alternate bringing each knee towards the chest in a running motion. Keep the pace up for an effective cardio workout that also improves agility and coordination', 60, 60, '5d51f171-afbf-4885-91e3-83f0cc72499d'),

('Squats', 'Start standing, then lower into a squat position, keeping your chest up and knees over toes. Return to standing', 60, 60, '6bddceaa-8c75-4946-84df-38a4f2abbe79'),
('Push-ups', 'Begin in a plank position with hands shoulder-width apart, lower your body until your chest nearly touches the ground, then push back up to the starting position', 60, 60, '6bddceaa-8c75-4946-84df-38a4f2abbe79'),
('Lunges', 'Start by standing tall, then step forward with one leg, bending both knees until the front thigh is parallel to the ground and the back knee hovers just above the floor. Push back to the starting position and repeat on the other side', 45, 60, '6bddceaa-8c75-4946-84df-38a4f2abbe79'),
('Bicycle crunches', 'Begin by lying on your back, hands behind your head, and legs raised with knees bent. Alternate bringing opposite elbows towards opposite knees in a cycling motion while extending the other leg', 60, 60, '6bddceaa-8c75-4946-84df-38a4f2abbe79'),

('Jump squats', 'Start in a squat position, then explosively jump upwards, reaching for the ceiling. Land softly, returning to the squat position, and immediately jump again', 60, 60, '8a8f1dd4-5d4f-4e35-951d-27f80d7c0db2'),
('Plyo lunges', 'Begin in a lunge position with one foot forward and one foot back. Jump explosively, switching legs mid-air and landing in a lunge position with the opposite foot forward. Repeat in a continuous motion, alternating legs with each jump', 60, 60, '8a8f1dd4-5d4f-4e35-951d-27f80d7c0db2'),
('Box jumps', 'Start by standing in front of a sturdy box or platform. Jump explosively onto the box, landing softly with both feet. Step or jump back down and immediately repeat', 60, 60, '8a8f1dd4-5d4f-4e35-951d-27f80d7c0db2'),
('Push-ups', 'Begin in a plank position with hands shoulder-width apart, lower your body until your chest nearly touches the ground, then push back up to the starting position', 60, 60, '8a8f1dd4-5d4f-4e35-951d-27f80d7c0db2'),

('Burpees', 'Begin in a standing position, then drop into a squat, kick legs back into a plank, perform a push-up, jump feet back to the squat position, and explode upwards into a jump', 45, 60, 'c48f1b14-7893-4785-845d-6fbd0b8274f7'),
('Mountain climbers', 'Start in a plank position, then alternate bringing each knee towards the chest in a running motion. Keep the pace up for an effective cardio workout that also improves agility and coordination', 60, 60, 'c48f1b14-7893-4785-845d-6fbd0b8274f7'),
('Dumbbell thrusters', 'Begin by holding dumbbells at shoulder height with palms facing inwards. Perform a squat, then explosively press the dumbbells overhead as you stand up', 60, 60, 'c48f1b14-7893-4785-845d-6fbd0b8274f7'),
('Renegade rows', 'Begin in a plank position with a dumbbell in each hand. Perform a row with one arm, pulling the dumbbell towards your hip while keeping your core engaged and hips stable. Lower the dumbbell back to the ground and repeat on the other side', 45, 60, 'c48f1b14-7893-4785-845d-6fbd0b8274f7'),

('Jumping rope', 'Begin by holding the handles of a jump rope in each hand, and jumping over the rope with both feet, aiming for a smooth and consistent rhythm', 60, 60, 'e5fd4c8a-84f8-4f06-8aa1-8b80cb86b43c'),
('High-intensity cycling', 'Participants pedal on stationary bikes at high speeds and resistance levels, simulating outdoor cycling conditions', 60, 60, 'e5fd4c8a-84f8-4f06-8aa1-8b80cb86b43c'),
('Running intervals', 'This workout can be performed on a track, treadmill, or outdoor route. Start by warming up with a light jog, then increase your pace to a sprint', 45, 60, 'e5fd4c8a-84f8-4f06-8aa1-8b80cb86b43c'),
('Jumping lunges', 'Start in a lunge position with one foot forward and one foot back. From this position, you explosively jump upwards, switching the position of your legs mid-air. Land softly in a lunge position with the opposite foot forward, then immediately jump again, alternating legs with each repetition', 60, 60, 'e5fd4c8a-84f8-4f06-8aa1-8b80cb86b43c'),

('Jump squats', 'Start in a squat position, then explosively jump upwards, reaching for the ceiling. Land softly, returning to the squat position, and immediately jump again', 45, 60, 'f3a1bf47-5c68-4c31-bba4-af6c86016a4e'),
('Burpees', 'Begin in a standing position, then drop into a squat, kick legs back into a plank, perform a push-up, jump feet back to the squat position, and explode upwards into a jump', 60, 60, 'f3a1bf47-5c68-4c31-bba4-af6c86016a4e'),
('Bicycle crunches', 'Begin by lying on your back, hands behind your head, and legs raised with knees bent. Alternate bringing opposite elbows towards opposite knees in a cycling motion while extending the other leg', 60, 60, 'f3a1bf47-5c68-4c31-bba4-af6c86016a4e'),
('Lateral jumps', 'Jump explosively to one side, landing softly on the balls of your feet, then immediately jump back to the starting position or to the opposite side. Keep your movements quick and controlled, using your arms to help generate momentum', 45, 60, 'f3a1bf47-5c68-4c31-bba4-af6c86016a4e'),

('Jump squats', 'Start in a squat position, then explosively jump upwards, reaching for the ceiling. Land softly, returning to the squat position, and immediately jump again', 60, 60, 'a0258332-7b4c-4974-98b1-83d47c55c192'),
('Reverse crunches', 'Lie on your back, bend your knees, and lift your legs. Engage your core to lift your hips off the ground towards the ceiling. Lower back down and repeat', 60, 60, 'a0258332-7b4c-4974-98b1-83d47c55c192'),
('Plank with shoulder taps', 'Start in a plank position and tap your shoulders alternately with each hand', 60, 60, 'a0258332-7b4c-4974-98b1-83d47c55c192'),
('Side plank', ' Start by balancing on one forearm and the side of one foot, lifting your hips off the ground to form a straight line from head to heels', 45, 60, 'a0258332-7b4c-4974-98b1-83d47c55c192'),

('Burpees', 'Begin in a standing position, then drop into a squat, kick legs back into a plank, perform a push-up, jump feet back to the squat position, and explode upwards into a jump', 60, 60, 'f57e222c-248e-4bfc-af6e-f68d95c0e43d'),
('Russian twists', 'Hold a weight or medicine ball with both hands and rotate your torso from side to side, tapping the weight on the ground next to your hips', 45, 60, 'f57e222c-248e-4bfc-af6e-f68d95c0e43d'),
('Tuck jumps', 'Start by standing with feet hip-width apart. Squat down, then explode upwards, bringing your knees towards your chest. Land softly and immediately repeat', 60, 60, 'f57e222c-248e-4bfc-af6e-f68d95c0e43d'),
('Leg raises', 'Start by lying on your back, lift your legs towards the ceiling, and lower them back down, targeting the lower abs and improving core strength', 45, 60, 'f57e222c-248e-4bfc-af6e-f68d95c0e43d');