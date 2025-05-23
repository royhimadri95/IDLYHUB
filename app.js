// Initialize Supabase (replace with your keys later)
const supabaseUrl ='https//rsficxyvgjszmhbjcglb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzZmljeHl2Z2pzem1oYmpjZ2xiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MDM4OTUsImV4cCI6MjA2MzQ3OTg5NX0.ZN7suQbI9ZN9JaowunSsKHNqNFu8cLVmyIDTQjHtVec';
const supabase = supabase.createClient( 'https://rsficxyvgjszmhbjcglb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzZmljeHl2Z2pzem1oYmpjZ2xiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MDM4OTUsImV4cCI6MjA2MzQ3OTg5NX0.ZN7suQbI9ZN9JaowunSsKHNqNFu8cLVmyIDTQjHtVec');

// DOM Elements
const loginScreen = document.getElementById('loginScreen');
const dashboard = document.getElementById('dashboard');
const loginBtn = document.getElementById('loginBtn');
const submitBtn = document.getElementById('submitBtn');
const idliesSoldInput = document.getElementById('idliesSold');
const idliesReturnedSpan = document.getElementById('idliesReturned');
const amountToReturnSpan = document.getElementById('amountToReturn');

// Auto-calculate returns
idliesSoldInput.addEventListener('input', () => {
  const sold = parseInt(idliesSoldInput.value) || 0;
  const returned = 1000 - sold;
  idliesReturnedSpan.textContent = returned;
  amountToReturnSpan.textContent = returned * 10;
});

// Login with magic link (NEW CODE - PASTE THIS)
loginBtn.addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  
  // Debugging: Verify email is captured
  console.log("Attempting login for:", email); 
  
  try {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: 'https://royhimadri95.github.io/IDLYHUB/'
      }
    });

    if (error) {
      console.error("Supabase error:", error);
      alert(`Failed: ${error.message}\n(Check console for details)`);
    } else {
      console.log("Magic link sent successfully");
      alert("Login link sent! Check your email AND spam folder.");
    }
  } catch (err) {
    console.error("Critical error:", err);
    alert("System error. Press F12 → Console for details.");
  }
});

// Submit record
submitBtn.addEventListener('click', async () => {
  const { data: { user } } = await supabase.auth.getUser();
  const { error } = await supabase.from('records').insert([{
    worker_id: user.id,
    time_in: document.getElementById('timeIn').value,
    time_out: document.getElementById('timeOut').value,
    idlies_sold: parseInt(idliesSoldInput.value)
  }]);
  
  if (error) alert('Error saving: ' + error.message);
  else alert('Record saved successfully!');
});

// Check if user is logged in
supabase.auth.onAuthStateChange((event, session) => {
  if (session) {
    loginScreen.classList.add('hidden');
    dashboard.classList.remove('hidden');
  }
});