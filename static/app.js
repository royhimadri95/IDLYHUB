const supabaseUrl = 'PASTE_YOUR_SUPABASE_URL_HERE';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzZmljeHl2Z2pzem1oYmpjZ2xiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MDM4OTUsImV4cCI6MjA2MzQ3OTg5NX0.ZN7suQbI9ZN9JaowunSsKHNqNFu8cLVmyIDTQjHtVec';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// DOM elements
const loginScreen = document.getElementById('loginScreen');
const dashboard = document.getElementById('dashboard');

// Login function
document.getElementById('loginBtn').addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  const { error } = await supabase.auth.signInWithOtp({ 
    email,
    options: { emailRedirectTo: window.location.href }
  });
  if (error) alert('Error: ' + error.message);
  else alert('Check your email for the login link!');
});

// Submit function
document.getElementById('submitBtn').addEventListener('click', async () => {
  const { data: { user } } = await supabase.auth.getUser();
  const { error } = await supabase.from('records').insert([{
    worker_id: user.id,
    time_in: document.getElementById('timeIn').value,
    time_out: document.getElementById('timeOut').value,
    idlies_sold: parseInt(document.getElementById('idliesSold').value)
  }]);
  if (error) alert('Error saving: ' + error.message);
  else alert('Record saved!');
});

// Auth state listener
supabase.auth.onAuthStateChange((event, session) => {
  if (session) {
    loginScreen.classList.add('hidden');
    dashboard.classList.remove('hidden');
  }
});