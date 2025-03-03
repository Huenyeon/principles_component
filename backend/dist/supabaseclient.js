"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
var supabase_js_1 = require("@supabase/supabase-js");
var supabaseUrl = 'https://gbotntyjxqtijwrtaueh.supabase.co';
var supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdib3RudHlqeHF0aWp3cnRhdWVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwMTA3NDEsImV4cCI6MjA1NjU4Njc0MX0.UW4UefGSZHpdcdjzznmB2w-alUVClBwauIQ_3AfgOlw';
exports.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
