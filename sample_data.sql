DO $$
DECLARE
    current_user_id UUID;
BEGIN
    -- Get the current user's ID
    SELECT id INTO current_user_id FROM auth.users LIMIT 1;

    -- Insert transactions
    INSERT INTO public.transactions (id, user_id, amount, type, category, description, created_at)
    VALUES
        -- Today's transactions
        (gen_random_uuid(), current_user_id, 1250.00, 'deposit', 'salary', 'September Internship Payment', NOW()),
        (gen_random_uuid(), current_user_id, 45.50, 'withdrawal', 'food', 'Tim Hortons Coffee and Breakfast', NOW() - interval '2 hours'),
        (gen_random_uuid(), current_user_id, 89.99, 'withdrawal', 'shopping', 'Amazon - Study Materials', NOW() - interval '5 hours'),
        
        -- Yesterday's transactions
        (gen_random_uuid(), current_user_id, 25.00, 'withdrawal', 'transport', 'TTC Monthly Pass', NOW() - interval '1 day'),
        (gen_random_uuid(), current_user_id, 150.00, 'withdrawal', 'utilities', 'Rogers Internet Bill', NOW() - interval '1 day'),
        
        -- Past week transactions
        (gen_random_uuid(), current_user_id, 200.00, 'deposit', 'other', 'Birthday Gift from Grandma', NOW() - interval '3 days'),
        (gen_random_uuid(), current_user_id, 65.75, 'withdrawal', 'entertainment', 'Movie Night with Friends', NOW() - interval '4 days'),
        (gen_random_uuid(), current_user_id, 42.50, 'withdrawal', 'food', 'Grocery Shopping', NOW() - interval '5 days'),
        
        -- Past month transactions
        (gen_random_uuid(), current_user_id, 1250.00, 'deposit', 'salary', 'August Internship Payment', NOW() - interval '30 days'),
        (gen_random_uuid(), current_user_id, 499.99, 'withdrawal', 'shopping', 'New iPad for Studies', NOW() - interval '25 days'),
        (gen_random_uuid(), current_user_id, 75.00, 'withdrawal', 'utilities', 'Phone Bill', NOW() - interval '20 days'),
        (gen_random_uuid(), current_user_id, 30.00, 'withdrawal', 'transport', 'Uber to Campus', NOW() - interval '15 days');

    -- Insert notifications
    INSERT INTO public.notifications (id, user_id, title, message, type, created_at)
    VALUES
        -- Recent notifications
        (gen_random_uuid(), current_user_id, 'Salary Deposited', 'Your internship payment of $1,250.00 has been deposited', 'success', NOW()),
        (gen_random_uuid(), current_user_id, 'Purchase at Tim Hortons', 'You spent $45.50 at Tim Hortons', 'info', NOW() - interval '2 hours'),
        (gen_random_uuid(), current_user_id, 'Online Purchase', 'Amazon purchase of $89.99 completed', 'info', NOW() - interval '5 hours'),
        
        -- Earlier notifications
        (gen_random_uuid(), current_user_id, 'Bill Payment', 'Rogers Internet bill payment successful', 'success', NOW() - interval '1 day'),
        (gen_random_uuid(), current_user_id, 'Large Purchase Alert', 'A purchase of $499.99 was made at Apple Store', 'warning', NOW() - interval '25 days'),
        
        -- Account notifications
        (gen_random_uuid(), current_user_id, 'Welcome to RBC Student Banking', 'Thank you for choosing RBC for your student banking needs', 'success', NOW() - interval '31 days'),
        (gen_random_uuid(), current_user_id, 'Security Alert', 'New device logged into your account', 'warning', NOW() - interval '29 days'),
        (gen_random_uuid(), current_user_id, 'Student Offer Available', 'You are eligible for a student credit card with 0% APR', 'info', NOW() - interval '10 days');
END $$; 