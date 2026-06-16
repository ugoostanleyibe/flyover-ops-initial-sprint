/* ==========================================================================
   Flyover Ops — UI/UX Spacing Cockpit JS
   Author: Stanley Ibe (Full-Stack Engineer Deliverables)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // --- STATE MANAGEMENT ---
  const state = {
    activeTab: "hub-tab",
    activePage: "homepage",
    activeRole: "worker",
    viewMode: "mockup", // mockup or wireframe
    overlays: {
      spacing: false,
      vectors: false,
      grid: false,
    },
  };

  // --- HTML TEMPLATES FOR THE 7 PAGES ---
  const pagesTemplates = {
    homepage: {
      title: "Homepage (Landing Portal)",
      database:
        "N/A (Read-only static copy, routes to Users table for Sign Up)",
      endpoints: "N/A (Static delivery)",
      layoutSpecs:
        "Grid: 12-Col. Containers: 1140px. Spacing: 64px sections, 24px grid gaps, 16px element margins.",
      html: `
        <div class="wire-header layout-box-padding">
          <div class="wire-logo">FLYOVER OPS</div>
          <div class="wire-nav">
            <span>Home</span><span>About</span><span>Services</span><span>FAQ</span>
          </div>
          <div class="layout-flex">
            <button class="mock-btn secondary btn-login" style="margin-right: 8px;">Login</button>
            <button class="mock-btn primary btn-register">Sign Up</button>
          </div>
        </div>
        
        <div class="spacer-v spacer-32" data-label="32px (MD Spacing)"></div>
        
        <div class="mock-hero layout-box-padding">
          <div class="mock-title-box">
            <h1>Connecting Global Projects with Talented African Workers</h1>
            <p class="mock-subtitle">We bridge the gap between international business demand and the growing pool of skilled remote professionals across Africa.</p>
            <div class="spacer-v spacer-24" data-label="24px (SM Spacing)"></div>
            <div class="mock-ctas">
              <button class="mock-btn primary btn-hire">Hire Talent</button>
              <button class="mock-btn accent btn-partner">Become a Partner</button>
              <button class="mock-btn secondary btn-join">Join Talent Network</button>
            </div>
          </div>
        </div>

        <div class="spacer-v spacer-48" data-label="48px (XL Spacing)"></div>

        <div class="mock-section layout-box-padding">
          <h2 class="section-title">Our Outsourcing & Workforce Services</h2>
          <div class="spacer-v spacer-24" data-label="24px"></div>
          <div class="services-grid">
            <div class="service-card">
              <div class="card-icon-box">📊</div>
              <h3>Workforce Operations</h3>
              <p>Scale your digital tasks: data entry, AI labeling, transcription, content moderation, and internet research.</p>
            </div>
            <div class="service-card">
              <div class="card-icon-box">🌍</div>
              <h3>Diaspora Outsourcing</h3>
              <p>We serve as the execution partner for professionals in the diaspora, providing remote teams to scale their agencies.</p>
            </div>
            <div class="service-card">
              <div class="card-icon-box">⚡</div>
              <h3>Talent Outsourcing</h3>
              <p>Access pre-vetted virtual assistants, community managers, and administrative support trained to global standards.</p>
            </div>
          </div>
        </div>

        <div class="spacer-v spacer-32" data-label="32px"></div>
        <div class="wire-footer layout-box-padding">
          <p>© 2026 Flyover Ops. Connecting Opportunities. All Rights Reserved.</p>
        </div>
      `,
    },
    login: {
      title: "Login Page",
      database:
        "Users, Roles, Profiles (verify hash, session state, access tokens)",
      endpoints: "POST /api/v1/auth/login, POST /api/v1/auth/forgot-password",
      layoutSpecs:
        "Layout: Centered login card, fixed 400px width. Spacing: 32px inner card padding, 16px label-to-input gap.",
      html: `
        <div class="wire-header layout-box-padding">
          <div class="wire-logo">FLYOVER OPS</div>
          <button class="mock-btn secondary btn-back-home">Back to Home</button>
        </div>
        
        <div class="auth-container">
          <div class="auth-card layout-box-padding">
            <div class="auth-header">
              <h2>Welcome Back</h2>
              <p>Enter your credentials to access your dashboard</p>
            </div>
            <div class="spacer-v spacer-16" data-label="16px"></div>
            <form class="auth-form" onsubmit="return false;">
              <div class="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="name@company.com" value="stanley@flyoverops.com">
              </div>
              <div class="form-group">
                <label>Password</label>
                <input type="password" placeholder="••••••••" value="password123">
              </div>
              <div class="spacer-v spacer-8" data-label="8px"></div>
              <button class="mock-btn primary btn-submit-login">Secure Login</button>
            </form>
            <div class="spacer-v spacer-16" data-label="16px"></div>
            <div class="auth-footer-links">
              <a href="#" class="forgot-pass-btn">Forgot Password?</a>
              <div class="spacer-v spacer-8" data-label="8px"></div>
              <span style="color: var(--text-muted);">Don't have an account?</span> <a href="#" class="go-register-btn">Sign Up</a>
            </div>
          </div>
        </div>
        
        <div class="wire-footer layout-box-padding">
          <p>© 2026 Flyover Ops. Secure authentication node.</p>
        </div>
      `,
    },
    register: {
      title: "Registration Page (Role Specific)",
      database:
        "Users (insert new), Profiles (initialize details), Documents (save CVs/IDs)",
      endpoints: "POST /api/v1/auth/register, POST /api/v1/documents/upload",
      layoutSpecs:
        "Layout: Split role tabs, dynamic forms, centered registration card. Spacing: 32px card padding, 24px vertical block gaps.",
      html: `
        <div class="wire-header layout-box-padding">
          <div class="wire-logo">FLYOVER OPS</div>
          <button class="mock-btn secondary btn-back-home">Back to Home</button>
        </div>
        
        <div class="auth-container">
          <div class="auth-card layout-box-padding" style="width: 450px;">
            <div class="auth-header">
              <h2>Create Your Account</h2>
              <p>Select your user profile to get started</p>
            </div>
            <div class="spacer-v spacer-16" data-label="16px"></div>
            
            <div class="role-tabs">
              <button class="role-tab-btn active" id="tab-worker">Worker</button>
              <button class="role-tab-btn" id="tab-diaspora">Diaspora</button>
              <button class="role-tab-btn" id="tab-company">Company</button>
            </div>
            
            <form class="auth-form" id="register-form" onsubmit="return false;">
              <!-- Dynamic Form Fields will be represented here -->
              <div class="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Stanley Ibe">
              </div>
              <div class="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="stanley@example.com">
              </div>
              <div id="dynamic-fields-area" class="layout-flex" style="flex-direction: column; gap: var(--space-sm);">
                <div class="form-group">
                  <label>CV / Resume Upload</label>
                  <input type="file">
                </div>
                <div class="form-group">
                  <label>Primary Skills</label>
                  <input type="text" placeholder="e.g. Data Entry, AI Annotation, Python">
                </div>
              </div>
              <div class="form-group">
                <label>Password</label>
                <input type="password" placeholder="Min. 8 characters">
              </div>
              
              <div class="spacer-v spacer-16" data-label="16px"></div>
              <button class="mock-btn primary btn-submit-register">Submit Registration</button>
            </form>
            <div class="spacer-v spacer-16" data-label="16px"></div>
            <div class="auth-footer-links">
              <span style="color: var(--text-muted);">Already have an account?</span> <a href="#" class="go-login-btn">Login</a>
            </div>
          </div>
        </div>
        
        <div class="wire-footer layout-box-padding">
          <p>© 2026 Flyover Ops. Role-based verification registration protocol.</p>
        </div>
      `,
    },
    "worker-dashboard": {
      title: "Worker Dashboard",
      database:
        "Users, Profiles, Training Modules, Assessments, Tasks, Task Submissions, Earnings",
      endpoints:
        "GET /api/v1/worker/profile, GET /api/v1/worker/tasks, POST /api/v1/worker/submissions, GET /api/v1/worker/earnings",
      layoutSpecs:
        "Layout: Sidebar grid + main area. Grid columns: 250px sidebar, 1fr content. Content Spacing: 24px card padding, 16px row gaps.",
      html: `
        <div class="wire-header layout-box-padding">
          <div class="wire-logo">FLYOVER OPS <span style="font-size: 11px; font-weight: normal; color: var(--accent-green);">Worker Dashboard</span></div>
          <div class="layout-flex" style="align-items: center; gap: 12px;">
            <span style="font-size: 12px; font-weight: 600;">Kofi Mensah</span>
            <button class="mock-btn secondary btn-logout" style="padding: 6px 12px;">Logout</button>
          </div>
        </div>
        
        <div class="dash-layout">
          <div class="dash-sidebar layout-box-padding">
            <div class="dash-side-item active">Overview</div>
            <div class="dash-side-item">Training Center</div>
            <div class="dash-side-item">Assigned Tasks</div>
            <div class="dash-side-item">Earnings History</div>
            <div class="dash-side-item">My Profile</div>
          </div>
          
          <div class="dash-main-body layout-box-padding">
            <div class="dash-hero-stats">
              <div class="stat-box">
                <div class="stat-label">Assigned Tasks</div>
                <div class="stat-val">3 Tasks</div>
              </div>
              <div class="stat-box">
                <div class="stat-label">Approved Work</div>
                <div class="stat-val">12 Files</div>
              </div>
              <div class="stat-box" style="border-color: rgba(57, 255, 20, 0.3);">
                <div class="stat-label" style="color: var(--accent-green);">Pending Earnings</div>
                <div class="stat-val">$180.00</div>
              </div>
              <div class="stat-box">
                <div class="stat-label">Training Completed</div>
                <div class="stat-val">2 Modules</div>
              </div>
            </div>
            
            <div class="spacer-v spacer-16" data-label="16px"></div>
            
            <div class="grid-two-cols">
              <div class="dash-card layout-box-padding">
                <div class="card-title">
                  <span class="card-title-text">My Profile Details</span>
                  <button class="mock-btn secondary" style="padding: 4px 8px; font-size: 10px;">Edit</button>
                </div>
                <div class="profile-card-split">
                  <div class="profile-avatar-placeholder">👨🏾‍💻</div>
                  <div class="profile-info-grid">
                    <h4>Kofi Mensah</h4>
                    <p>Accra, Ghana | kofi.mensah@gmail.com</p>
                    <p><strong>Skills:</strong> Data Annotation, Image Labeling, QA testing</p>
                  </div>
                </div>
              </div>
              
              <div class="dash-card layout-box-padding">
                <div class="card-title">
                  <span class="card-title-text">Current Training Modules</span>
                </div>
                <div class="training-list">
                  <div class="training-item">
                    <div class="item-left">
                      <span class="item-title">AI Annotation Guidelines v2</span>
                      <span class="item-meta">Progress: 80% | 1 assessment pending</span>
                    </div>
                    <button class="mock-btn primary" style="padding: 4px 8px; font-size: 10px;">Continue</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="dash-card layout-box-padding">
              <div class="card-title">
                <span class="card-title-text">Active Assigned Tasks</span>
              </div>
              <div class="tasks-list">
                <div class="task-row">
                  <div class="item-left">
                    <span class="item-title">Labeling Pedestrian Boxes (Project Alpha)</span>
                    <span class="item-meta">Deadline: June 20, 2026 | Budget: $0.15 per bounding box</span>
                  </div>
                  <button class="mock-btn accent btn-submit-task" style="padding: 6px 12px; font-size: 11px;">Submit Work</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
    },
    "diaspora-dashboard": {
      title: "Diaspora Partner Dashboard",
      database: "Users, Profiles, Projects, Tasks, Earnings, Documents",
      endpoints:
        "GET /api/v1/diaspora/projects, POST /api/v1/diaspora/projects, GET /api/v1/diaspora/earnings",
      layoutSpecs:
        "Layout: Left sidebar + central analytics panel + action forms. Spacing: 24px panel borders, 16px form control gaps.",
      html: `
        <div class="wire-header layout-box-padding">
          <div class="wire-logo">FLYOVER OPS <span style="font-size: 11px; font-weight: normal; color: var(--accent-purple);">Diaspora Dashboard</span></div>
          <div class="layout-flex" style="align-items: center; gap: 12px;">
            <span style="font-size: 12px; font-weight: 600;">Stanley Ibe</span>
            <button class="mock-btn secondary btn-logout" style="padding: 6px 12px;">Logout</button>
          </div>
        </div>
        
        <div class="dash-layout">
          <div class="dash-sidebar layout-box-padding">
            <div class="dash-side-item active">Overview</div>
            <div class="dash-side-item">Submit Project</div>
            <div class="dash-side-item">Monitor Progress</div>
            <div class="dash-side-item">Commissions Log</div>
            <div class="dash-side-item">Business Setup</div>
          </div>
          
          <div class="dash-main-body layout-box-padding">
            <div class="dash-hero-stats">
              <div class="stat-box">
                <div class="stat-label">Projects Submitted</div>
                <div class="stat-val">4 Projects</div>
              </div>
              <div class="stat-box">
                <div class="stat-label">Assigned Workers</div>
                <div class="stat-val">15 Workers</div>
              </div>
              <div class="stat-box" style="border-color: rgba(138, 43, 226, 0.3);">
                <div class="stat-label" style="color: #BE99FF;">Earned Commission</div>
                <div class="stat-val">$2,450.00</div>
              </div>
              <div class="stat-box">
                <div class="stat-label">Active Gigs</div>
                <div class="stat-val">2 Active</div>
              </div>
            </div>
            
            <div class="spacer-v spacer-16" data-label="16px"></div>
            
            <div class="grid-two-cols">
              <div class="dash-card layout-box-padding">
                <div class="card-title">
                  <span class="card-title-text">Submit New Outsourced Project</span>
                </div>
                <form class="auth-form" onsubmit="return false;" style="gap: 8px;">
                  <div class="form-group">
                    <label>Project Title</label>
                    <input type="text" placeholder="e.g. E-Commerce Image Tagging" value="Medical Records Transcription">
                  </div>
                  <div class="form-group">
                    <label>Client Name (End Client)</label>
                    <input type="text" placeholder="e.g. HealthCare Inc" value="St. Jude Hospital">
                  </div>
                  <div class="form-group">
                    <label>Total Budget ($)</label>
                    <input type="number" placeholder="1500" value="2500">
                  </div>
                  <div class="form-group">
                    <label>Required Workers</label>
                    <input type="number" placeholder="5" value="3">
                  </div>
                  <div class="spacer-v spacer-8" data-label="8px"></div>
                  <button class="mock-btn primary btn-submit-project">Submit to Admin</button>
                </form>
              </div>
              
              <div class="dash-card layout-box-padding">
                <div class="card-title">
                  <span class="card-title-text">Active Project Monitoring</span>
                </div>
                <div class="tasks-list">
                  <div class="task-row">
                    <div class="item-left">
                      <span class="item-title">E-Commerce Data Extraction</span>
                      <span class="item-meta">Workers: 5 assigned | Status: Active</span>
                    </div>
                    <span style="font-size: 11px; font-weight: bold; color: var(--accent-cyan);">75% Done</span>
                  </div>
                  <div class="task-row">
                    <div class="item-left">
                      <span class="item-title">Legal Brief PDFs Categorization</span>
                      <span class="item-meta">Workers: 2 assigned | Status: Active</span>
                    </div>
                    <span style="font-size: 11px; font-weight: bold; color: var(--accent-cyan);">40% Done</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
    },
    "company-dashboard": {
      title: "Company Dashboard",
      database: "Users, Profiles, Projects, Tasks, Documents",
      endpoints:
        "GET /api/v1/company/profile, POST /api/v1/company/talent-request, GET /api/v1/company/team",
      layoutSpecs:
        "Layout: Sidebar split, grid dashboard statistics, active talent request log. Spacing: 32px panels, 24px inner grids.",
      html: `
        <div class="wire-header layout-box-padding">
          <div class="wire-logo">FLYOVER OPS <span style="font-size: 11px; font-weight: normal; color: var(--accent-cyan);">Company Dashboard</span></div>
          <div class="layout-flex" style="align-items: center; gap: 12px;">
            <span style="font-size: 12px; font-weight: 600;">Global Tech Corp</span>
            <button class="mock-btn secondary btn-logout" style="padding: 6px 12px;">Logout</button>
          </div>
        </div>
        
        <div class="dash-layout">
          <div class="dash-sidebar layout-box-padding">
            <div class="dash-side-item active">Overview</div>
            <div class="dash-side-item">Request Talent</div>
            <div class="dash-side-item">Team Tracker</div>
            <div class="dash-side-item">Project status</div>
            <div class="dash-side-item">Billing & Invoices</div>
          </div>
          
          <div class="dash-main-body layout-box-padding">
            <div class="dash-hero-stats">
              <div class="stat-box">
                <div class="stat-label">Active Team Size</div>
                <div class="stat-val">8 Workers</div>
              </div>
              <div class="stat-box">
                <div class="stat-label">Open Projects</div>
                <div class="stat-val">2 Active</div>
              </div>
              <div class="stat-box">
                <div class="stat-label">Hours Tracked</div>
                <div class="stat-val">340 Hours</div>
              </div>
              <div class="stat-box" style="border-color: rgba(0, 229, 255, 0.3);">
                <div class="stat-label" style="color: var(--accent-cyan);">Monthly Retainer</div>
                <div class="stat-val">$3,200.00</div>
              </div>
            </div>
            
            <div class="spacer-v spacer-16" data-label="16px"></div>
            
            <div class="grid-two-cols">
              <div class="dash-card layout-box-padding">
                <div class="card-title">
                  <span class="card-title-text">Request Remote Talent Support</span>
                </div>
                <form class="auth-form" onsubmit="return false;" style="gap: 8px;">
                  <div class="form-group">
                    <label>Talent Category</label>
                    <select>
                      <option>Virtual Assistant</option>
                      <option>AI Data Annotator</option>
                      <option>Customer Support Agent</option>
                      <option>Content Moderator</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Required Team Size</label>
                    <input type="number" value="2">
                  </div>
                  <div class="form-group">
                    <label>Required Skills (Comma separated)</label>
                    <input type="text" value="Customer ticket handling, Zendesk, Email correspondence">
                  </div>
                  <div class="spacer-v spacer-8" data-label="8px"></div>
                  <button class="mock-btn primary btn-submit-talent-req">Submit Request</button>
                </form>
              </div>
              
              <div class="dash-card layout-box-padding">
                <div class="card-title">
                  <span class="card-title-text">Current Talent Monitoring</span>
                </div>
                <div class="tasks-list">
                  <div class="task-row">
                    <div class="item-left">
                      <span class="item-title">Moussa Diop (Senegal)</span>
                      <span class="item-meta">Role: Tech Support | Status: Active</span>
                    </div>
                    <span style="font-size: 11px; font-weight: bold; color: var(--accent-green);">★ 4.9 Rating</span>
                  </div>
                  <div class="task-row">
                    <div class="item-left">
                      <span class="item-title">Chinedu Oke (Nigeria)</span>
                      <span class="item-meta">Role: Data Admin | Status: Active</span>
                    </div>
                    <span style="font-size: 11px; font-weight: bold; color: var(--accent-green);">★ 4.8 Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
    },
    "admin-dashboard": {
      title: "Admin Dashboard",
      database:
        "All Tables (Users, Roles, Profiles, Projects, Tasks, Submissions, Earnings, Trainings, Assessments, Notifications, Documents)",
      endpoints:
        "Access to all system APIs, User Approvals, Task Reviews, Payout generation",
      layoutSpecs:
        "Layout: Sidebar menu, multi-tab tables, actions triggers. Spacing: 24px vertical padding, 16px table gutters.",
      html: `
        <div class="wire-header layout-box-padding">
          <div class="wire-logo">FLYOVER OPS <span style="font-size: 11px; font-weight: normal; color: var(--accent-red);">System Administrator</span></div>
          <div class="layout-flex" style="align-items: center; gap: 12px;">
            <span style="font-size: 12px; font-weight: 600;">Admin Central</span>
            <button class="mock-btn secondary btn-logout" style="padding: 6px 12px;">Logout</button>
          </div>
        </div>
        
        <div class="dash-layout">
          <div class="dash-sidebar layout-box-padding">
            <div class="dash-side-item active">Overview</div>
            <div class="dash-side-item">Pending Approvals</div>
            <div class="dash-side-item">Project Registry</div>
            <div class="dash-side-item">Task Review</div>
            <div class="dash-side-item">Training Management</div>
            <div class="dash-side-item">Financial Reporting</div>
          </div>
          
          <div class="dash-main-body layout-box-padding">
            <div class="dash-hero-stats">
              <div class="stat-box" style="border-color: rgba(255, 23, 68, 0.3);">
                <div class="stat-label" style="color: var(--accent-red);">Total Users</div>
                <div class="stat-val">124 Users</div>
              </div>
              <div class="stat-box">
                <div class="stat-label">Active Projects</div>
                <div class="stat-val">14 Active</div>
              </div>
              <div class="stat-box">
                <div class="stat-label">Active Workers</div>
                <div class="stat-val">42 Active</div>
              </div>
              <div class="stat-box">
                <div class="stat-label">Total Gigs Run</div>
                <div class="stat-val">$18,450.00</div>
              </div>
            </div>
            
            <div class="spacer-v spacer-16" data-label="16px"></div>
            
            <div class="dash-card layout-box-padding">
              <div class="card-title">
                <span class="card-title-text">Pending Registrations Approval</span>
              </div>
              <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                <thead>
                  <tr style="border-bottom: 1px solid var(--border-color); text-align: left;">
                    <th style="padding: 8px;">Name</th>
                    <th style="padding: 8px;">Email</th>
                    <th style="padding: 8px;">Role Requested</th>
                    <th style="padding: 8px; text-align: right;">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="border-bottom: 1px solid var(--border-color);">
                    <td style="padding: 8px;">Stanley Ibe</td>
                    <td style="padding: 8px;">stanley@example.com</td>
                    <td style="padding: 8px;"><span class="badge role" style="padding: 2px 6px;">Worker</span></td>
                    <td style="padding: 8px; text-align: right;">
                      <button class="mock-btn primary btn-admin-approve" style="padding: 4px 8px; font-size: 10px;">Approve</button>
                      <button class="mock-btn secondary" style="padding: 4px 8px; font-size: 10px;">Decline</button>
                    </td>
                  </tr>
                  <tr style="border-bottom: 1px solid var(--border-color);">
                    <td style="padding: 8px;">James & Co Agency</td>
                    <td style="padding: 8px;">james@jco.com</td>
                    <td style="padding: 8px;"><span class="badge sprint" style="padding: 2px 6px;">Company</span></td>
                    <td style="padding: 8px; text-align: right;">
                      <button class="mock-btn primary btn-admin-approve" style="padding: 4px 8px; font-size: 10px;">Approve</button>
                      <button class="mock-btn secondary" style="padding: 4px 8px; font-size: 10px;">Decline</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `,
    },
  };

  // --- HTML TEMPLATES FOR USER JOURNEYS ---
  const journeyTemplates = {
    worker: `
      <div class="flow-diagram">
        <div class="flow-node">
          <span class="node-step">Step 1: Discover</span>
          <h4 class="node-title">Landing Page</h4>
          <p class="node-desc">Visits website, clicks 'Join Talent Network' CTA</p>
        </div>
        <div class="flow-arrow">➔</div>
        <div class="flow-node" style="border-color: var(--accent-purple);">
          <span class="node-step">Step 2: Sign Up</span>
          <h4 class="node-title">Registration Form</h4>
          <p class="node-desc">Selects Worker role, fills in profile + uploads CV</p>
        </div>
        <div class="flow-arrow">➔</div>
        <div class="flow-node">
          <span class="node-step">Step 3: Verification</span>
          <h4 class="node-title">Admin Review</h4>
          <p class="node-desc">User is set to pending; Admin reviews CV and credentials</p>
        </div>
        <div class="flow-arrow">➔</div>
        <div class="flow-node" style="border-color: var(--accent-green);">
          <span class="node-step">Step 4: Access</span>
          <h4 class="node-title">Dashboard Login</h4>
          <p class="node-desc">Receives approval email, logs in, accesses training modules</p>
        </div>
      </div>
    `,
    diaspora: `
      <div class="flow-diagram">
        <div class="flow-node">
          <span class="node-step">Step 1: Entry</span>
          <h4 class="node-title">Landing Page</h4>
          <p class="node-desc">Visits homepage, clicks 'Become a Partner' CTA</p>
        </div>
        <div class="flow-arrow">➔</div>
        <div class="flow-node" style="border-color: var(--accent-purple);">
          <span class="node-step">Step 2: Authenticate</span>
          <h4 class="node-title">Registration</h4>
          <p class="node-desc">Creates Diaspora account, uploads ID & business docs</p>
        </div>
        <div class="flow-arrow">➔</div>
        <div class="flow-node">
          <span class="node-step">Step 3: Submission</span>
          <h4 class="node-title">Project Post</h4>
          <p class="node-desc">Submits project requirements, end-client name, budget, team size</p>
        </div>
        <div class="flow-arrow">➔</div>
        <div class="flow-node" style="border-color: var(--accent-green);">
          <span class="node-step">Step 4: Monitoring</span>
          <h4 class="node-title">Project Monitor</h4>
          <p class="node-desc">Admin assigns workers. Partner monitors progress & reports</p>
        </div>
      </div>
    `,
    company: `
      <div class="flow-diagram">
        <div class="flow-node">
          <span class="node-step">Step 1: Entry</span>
          <h4 class="node-title">Landing Page</h4>
          <p class="node-desc">Visits website, clicks 'Hire Talent' CTA</p>
        </div>
        <div class="flow-arrow">➔</div>
        <div class="flow-node" style="border-color: var(--accent-purple);">
          <span class="node-step">Step 2: Sign Up</span>
          <h4 class="node-title">Registration</h4>
          <p class="node-desc">Enters company profile info, tax ID, and uploads profile doc</p>
        </div>
        <div class="flow-arrow">➔</div>
        <div class="flow-node">
          <span class="node-step">Step 3: Talent Request</span>
          <h4 class="node-title">Submit Request</h4>
          <p class="node-desc">Defines talent category (VA/Annotator), team size, and skill requirements</p>
        </div>
        <div class="flow-arrow">➔</div>
        <div class="flow-node" style="border-color: var(--accent-green);">
          <span class="node-step">Step 4: Operations</span>
          <h4 class="node-title">Team Monitor</h4>
          <p class="node-desc">Views team tracker showing performance metrics & completion stats</p>
        </div>
      </div>
    `,
    admin: `
      <div class="flow-diagram">
        <div class="flow-node">
          <span class="node-step">Step 1: Manage Users</span>
          <h4 class="node-title">Approvals Central</h4>
          <p class="node-desc">Audits pending registrations. Approves or declines users</p>
        </div>
        <div class="flow-arrow">➔</div>
        <div class="flow-node" style="border-color: var(--accent-purple);">
          <span class="node-step">Step 2: Manage Projects</span>
          <h4 class="node-title">Project Allocator</h4>
          <p class="node-desc">Creates project nodes, matches Diaspora partners to companies</p>
        </div>
        <div class="flow-arrow">➔</div>
        <div class="flow-node">
          <span class="node-step">Step 3: Tasks Control</span>
          <h4 class="node-title">Task Scheduler</h4>
          <p class="node-desc">Breaks projects into tasks, assigns workers, audits submissions</p>
        </div>
        <div class="flow-arrow">➔</div>
        <div class="flow-node" style="border-color: var(--accent-green);">
          <span class="node-step">Step 4: Auditing</span>
          <h4 class="node-title">Financial Ledger</h4>
          <p class="node-desc">Generates earnings logs, calculates payouts & commissions</p>
        </div>
      </div>
    `,
  };

  // --- INSPECTOR CONTENT BUILDER ---
  const updateInspector = (viewType, targetName) => {
    const inspectorTitle = document.getElementById("inspector-title");
    const inspectorContent = document.getElementById("inspector-content");

    if (viewType === "hub") {
      inspectorTitle.textContent = "Project Overview";
      inspectorContent.innerHTML = `
        <div class="info-section">
          <h4>Active Workspace</h4>
          <p class="filepath">D:/Projects/FlyoverOps/flyover-ops</p>
        </div>
        <div class="info-section">
          <h4>Design Standard</h4>
          <ul class="spec-list">
            <li><strong>Spacing:</strong> 8px structural increments (8/16/24/32/48/64)</li>
            <li><strong>Grid:</strong> 12-Column Desktop, 1140px max-width, 24px gutters</li>
            <li><strong>Typography:</strong> Outfit (headings), Space Grotesk (technical UI)</li>
            <li><strong>Visual Style:</strong> Sleek Dark Mode, high-contrast borders, neon accessibility cues</li>
          </ul>
        </div>
        <div class="info-section">
          <h4>System Modules (11 Entities)</h4>
          <p>Users, Roles, Profiles, Projects, Tasks, Task Submissions, Notifications, Documents, Earnings, Assessments, Training Modules.</p>
        </div>
      `;
    } else if (viewType === "journey") {
      inspectorTitle.textContent = `Journey: ${targetName.toUpperCase()}`;

      let details = "";
      if (targetName === "worker") {
        details = `
          <div class="info-section">
            <h4>Journey Goals</h4>
            <p>Onboard remote talent in Africa, verify their skills, enroll them in specialized training, and assign micro-tasks.</p>
          </div>
          <div class="info-section">
            <h4>Core Touchpoints</h4>
            <p>1. Registration Page (Fields: Name, Email, CV, Skills).<br>2. Training Center (Video player, PDF doc viewer).<br>3. Tasks Console (Gigs, submission form, status updates).<br>4. Earnings Log.</p>
          </div>
          <div class="info-section">
            <h4>Primary Flow Vectors</h4>
            <p>Join Network ➔ Upload CV ➔ Pass Assessment ➔ Receive Work ➔ Submit Task ➔ Earn Payments.</p>
          </div>
        `;
      } else if (targetName === "diaspora") {
        details = `
          <div class="info-section">
            <h4>Journey Goals</h4>
            <p>Enable agency owners and professionals abroad to submit outsourced tasks and coordinate execution teams.</p>
          </div>
          <div class="info-section">
            <h4>Core Touchpoints</h4>
            <p>1. Registration Page (Uploads company docs, ID).<br>2. Submit Project Form (Fields: Title, End-client, budget, size).<br>3. Active Projects dashboard (Progress indicators).<br>4. Commission Log.</p>
          </div>
          <div class="info-section">
            <h4>Primary Flow Vectors</h4>
            <p>Register Partner ➔ Verify Identity ➔ Submit Requirements ➔ Review Dashboard Progress ➔ Track Referral Fees.</p>
          </div>
        `;
      } else if (targetName === "company") {
        details = `
          <div class="info-section">
            <h4>Journey Goals</h4>
            <p>Onboard international companies seeking dedicated remote staffing and support.</p>
          </div>
          <div class="info-section">
            <h4>Core Touchpoints</h4>
            <p>1. Registration Page.<br>2. Request Talent Form (Categories, team size, Zendesk/Excel skills).<br>3. Team Monitor Dashboard (Performance stats).<br>4. Billing Page.</p>
          </div>
          <div class="info-section">
            <h4>Primary Flow Vectors</h4>
            <p>Register Client ➔ Request Team ➔ Match Workers ➔ Monitor Daily Progress Reports.</p>
          </div>
        `;
      } else if (targetName === "admin") {
        details = `
          <div class="info-section">
            <h4>Journey Goals</h4>
            <p>Centrally control the Flyover Ops network. Match supply (workers) with demand (clients/partners) and guarantee quality.</p>
          </div>
          <div class="info-section">
            <h4>Core Touchpoints</h4>
            <p>1. User Approvals Panel (Verify users).<br>2. Project Registry (Associate worker ids to project ids).<br>3. Task Reviewer (Review task attachments).<br>4. Financial Dashboard.</p>
          </div>
          <div class="info-section">
            <h4>Primary Flow Vectors</h4>
            <p>Review Registrations ➔ Approve Users ➔ Launch Projects ➔ Audit Submissions ➔ Trigger Payouts.</p>
          </div>
        `;
      }
      inspectorContent.innerHTML = details;
    } else if (viewType === "wireframe") {
      const pageInfo = pagesTemplates[targetName];
      inspectorTitle.textContent = `Page: ${pageInfo.title}`;
      inspectorContent.innerHTML = `
        <div class="info-section">
          <h4>Interface Spacing Schema</h4>
          <p class="filepath">${pageInfo.layoutSpecs}</p>
        </div>
        <div class="info-section">
          <h4>Impacted Database Tables</h4>
          <p>${pageInfo.database}</p>
        </div>
        <div class="info-section">
          <h4>Key API Endpoints</h4>
          <p class="filepath">${pageInfo.endpoints}</p>
        </div>
        <div class="info-section">
          <h4>Frontend Flow Vectors</h4>
          <ul class="spec-list">
            <li><strong>Primary Action:</strong> Highlighted in cyan (Visual mode) or solid border (Wireframe mode).</li>
            <li><strong>Secondary Actions:</strong> Lead to modals or sub-views.</li>
            <li><strong>Vector Targets:</strong> Rendered as directional overlays on the page canvas.</li>
          </ul>
        </div>
      `;
    }
  };

  // --- SELECT DOM ELEMENTS ---
  const tabButtons = document.querySelectorAll(".nav-btn");
  const tabContents = document.querySelectorAll(".tab-content");
  const pageSelectorBox = document.getElementById("page-selector-box");
  const pageButtons = document.querySelectorAll(".page-btn");
  const canvasControls = document.getElementById("canvas-controls");
  const wireframeCanvas = document.getElementById("wireframe-workspace-canvas");

  // Toggles
  const modeMockupBtn = document.getElementById("mode-mockup");
  const modeWireframeBtn = document.getElementById("mode-wireframe");
  const toggleGrid = document.getElementById("toggle-grid");
  const toggleSpacing = document.getElementById("toggle-spacing");
  const toggleVectors = document.getElementById("toggle-vectors");

  // Layers
  const gridOverlay = document.getElementById("grid-overlay-layer");
  const vectorsOverlay = document.getElementById("vectors-overlay-layer");
  const journeyFlowContainer = document.getElementById(
    "journey-flow-container",
  );

  // --- INTERACTION LOGIC ---

  // 1. Tab Switching
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Set active nav button
      tabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const targetTab = btn.getAttribute("data-tab");
      state.activeTab = targetTab;

      // Show/Hide Tab Contents
      tabContents.forEach((content) => {
        if (content.id === targetTab) {
          content.classList.remove("hidden");
        } else {
          content.classList.add("hidden");
        }
      });

      // Handle sidebar page selector display
      if (targetTab === "wireframe-tab") {
        pageSelectorBox.classList.remove("hidden");
        canvasControls.classList.remove("hidden");
        renderActivePage();
        updateInspector("wireframe", state.activePage);
      } else {
        pageSelectorBox.classList.add("hidden");
        canvasControls.classList.add("hidden");
        if (targetTab === "journey-tab") {
          renderJourneyFlow();
          updateInspector("journey", state.activeRole);
        } else {
          updateInspector("hub", "");
        }
      }
    });
  });

  // 2. Journey Role Switching
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("journey-role-btn")) {
      const roleBtns = document.querySelectorAll(".journey-role-btn");
      roleBtns.forEach((btn) => btn.classList.remove("active"));
      e.target.classList.add("active");

      const role = e.target.getAttribute("data-role");
      state.activeRole = role;
      renderJourneyFlow();
      updateInspector("journey", role);
    }
  });

  function renderJourneyFlow() {
    journeyFlowContainer.innerHTML = journeyTemplates[state.activeRole];
  }

  // 3. Wireframe Page Selection
  pageButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      pageButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const page = btn.getAttribute("data-page");
      state.activePage = page;
      renderActivePage();
      updateInspector("wireframe", page);
    });
  });

  // Render Wireframe/Mockup Content
  function renderActivePage() {
    const pageData = pagesTemplates[state.activePage];
    wireframeCanvas.innerHTML = pageData.html;

    // Auto bind custom events inside wireframe template
    bindDynamicEvents();

    // Redraw SVG flow vectors if active
    if (state.overlays.vectors) {
      drawFlowVectors();
    }
  }

  // Bind links inside the templates dynamically to make it an interactive prototype
  function bindDynamicEvents() {
    // Nav Login & SignUp
    const loginBtn = wireframeCanvas.querySelector(".btn-login");
    const registerBtn = wireframeCanvas.querySelector(".btn-register");
    const backHomeBtn = wireframeCanvas.querySelector(".btn-back-home");
    const forgotPassBtn = wireframeCanvas.querySelector(".forgot-pass-btn");
    const goRegisterBtn = wireframeCanvas.querySelector(".go-register-btn");
    const goLoginBtn = wireframeCanvas.querySelector(".go-login-btn");

    // Homepage CTAs
    const btnHire = wireframeCanvas.querySelector(".btn-hire");
    const btnPartner = wireframeCanvas.querySelector(".btn-partner");
    const btnJoin = wireframeCanvas.querySelector(".btn-join");

    // Register tab selectors
    const tabWorker = wireframeCanvas.querySelector("#tab-worker");
    const tabDiaspora = wireframeCanvas.querySelector("#tab-diaspora");
    const tabCompany = wireframeCanvas.querySelector("#tab-company");

    if (loginBtn)
      loginBtn.addEventListener("click", () => navigateToPage("login"));
    if (registerBtn)
      registerBtn.addEventListener("click", () => navigateToPage("register"));
    if (backHomeBtn)
      backHomeBtn.addEventListener("click", () => navigateToPage("homepage"));
    if (forgotPassBtn)
      forgotPassBtn.addEventListener("click", () =>
        alert(
          "Mock Password Recovery Triggered (Sends token via POST /api/v1/auth/forgot-password)",
        ),
      );
    if (goRegisterBtn)
      goRegisterBtn.addEventListener("click", () => navigateToPage("register"));
    if (goLoginBtn)
      goLoginBtn.addEventListener("click", () => navigateToPage("login"));

    if (btnHire)
      btnHire.addEventListener("click", () =>
        navigateToPage("register", "company"),
      );
    if (btnPartner)
      btnPartner.addEventListener("click", () =>
        navigateToPage("register", "diaspora"),
      );
    if (btnJoin)
      btnJoin.addEventListener("click", () =>
        navigateToPage("register", "worker"),
      );

    // Forms submission alerts
    const btnSubmitLogin = wireframeCanvas.querySelector(".btn-submit-login");
    const btnSubmitRegister = wireframeCanvas.querySelector(
      ".btn-submit-register",
    );
    const btnSubmitProject = wireframeCanvas.querySelector(
      ".btn-submit-project",
    );
    const btnSubmitTalentReq = wireframeCanvas.querySelector(
      ".btn-submit-talent-req",
    );
    const btnSubmitTask = wireframeCanvas.querySelector(".btn-submit-task");
    const btnAdminApprove =
      wireframeCanvas.querySelectorAll(".btn-admin-approve");

    if (btnSubmitLogin) {
      btnSubmitLogin.addEventListener("click", () => {
        const email = wireframeCanvas.querySelector(
          'input[type="email"]',
        ).value;
        if (email.includes("admin")) {
          navigateToPage("admin-dashboard");
        } else if (email.includes("diaspora")) {
          navigateToPage("diaspora-dashboard");
        } else if (email.includes("company")) {
          navigateToPage("company-dashboard");
        } else {
          navigateToPage("worker-dashboard");
        }
      });
    }

    if (btnSubmitRegister) {
      btnSubmitRegister.addEventListener("click", () => {
        alert(
          "Registration Successful! Node created in database (Users table) with status PENDING_APPROVAL. Redirecting to Login.",
        );
        navigateToPage("login");
      });
    }

    if (btnSubmitProject) {
      btnSubmitProject.addEventListener("click", () => {
        alert(
          "Project successfully created in Database (Projects table) and assigned state PENDING_ADMIN_REVIEW. Triggered Admin notification.",
        );
      });
    }

    if (btnSubmitTalentReq) {
      btnSubmitTalentReq.addEventListener("click", () => {
        alert(
          "Talent Request Node dispatched (POST /api/v1/company/talent-request). Matchmakers notified.",
        );
      });
    }

    if (btnSubmitTask) {
      btnSubmitTask.addEventListener("click", () => {
        alert(
          "Task Submission form opened. Attaching file CV/Documents... Dispatched payload to POST /api/v1/worker/submissions.",
        );
      });
    }

    if (btnAdminApprove) {
      btnAdminApprove.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const row = e.target.closest("tr");
          const name = row.cells[0].textContent;
          alert(
            `Approved ${name}! State in Users database updated to ACTIVE. Dispatched approval email notification.`,
          );
          row.style.opacity = "0.3";
          e.target.disabled = true;
        });
      });
    }

    // Bind registration tab adjustments
    if (tabWorker)
      tabWorker.addEventListener("click", () => selectRegisterTab("worker"));
    if (tabDiaspora)
      tabDiaspora.addEventListener("click", () =>
        selectRegisterTab("diaspora"),
      );
    if (tabCompany)
      tabCompany.addEventListener("click", () => selectRegisterTab("company"));
  }

  function navigateToPage(pageKey, roleParam) {
    state.activePage = pageKey;

    // Highlight page button
    pageButtons.forEach((btn) => {
      if (btn.getAttribute("data-page") === pageKey) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    renderActivePage();
    updateInspector("wireframe", pageKey);

    if (roleParam) {
      selectRegisterTab(roleParam);
    }
  }

  function selectRegisterTab(role) {
    const form = wireframeCanvas.querySelector("#register-form");
    if (!form) return;

    const tabs = wireframeCanvas.querySelectorAll(".role-tab-btn");
    tabs.forEach((t) => {
      if (t.id === `tab-${role}`) t.classList.add("active");
      else t.classList.remove("active");
    });

    const dynamicArea = wireframeCanvas.querySelector("#dynamic-fields-area");
    if (role === "worker") {
      dynamicArea.innerHTML = `
        <div class="form-group">
          <label>CV / Resume Upload</label>
          <input type="file">
        </div>
        <div class="form-group">
          <label>Primary Skills</label>
          <input type="text" placeholder="e.g. Data Entry, AI Annotation, Python">
        </div>
      `;
    } else if (role === "diaspora") {
      dynamicArea.innerHTML = `
        <div class="form-group">
          <label>Country of Business</label>
          <input type="text" placeholder="e.g. United States, United Kingdom" value="United Kingdom">
        </div>
        <div class="form-group">
          <label>Outsourcing Industry</label>
          <input type="text" placeholder="e.g. Legal, Medical Billing, Copywriting" value="Medical Transcription">
        </div>
        <div class="form-group">
          <label>Business Registration / ID Document</label>
          <input type="file">
        </div>
      `;
    } else if (role === "company") {
      dynamicArea.innerHTML = `
        <div class="form-group">
          <label>Company Website URL</label>
          <input type="text" placeholder="https://company.com">
        </div>
        <div class="form-group">
          <label>Corporate Profile Document</label>
          <input type="file">
        </div>
      `;
    }

    // Re-bind spacing triggers
    if (state.overlays.spacing) {
      applySpacingClasses();
    }
  }

  // 4. View Mode Toggles (Mockup vs Wireframe)
  modeMockupBtn.addEventListener("click", () => {
    modeMockupBtn.classList.add("active");
    modeWireframeBtn.classList.remove("active");
    document.body.classList.remove("wireframe-mode");
    state.viewMode = "mockup";
  });

  modeWireframeBtn.addEventListener("click", () => {
    modeWireframeBtn.classList.add("active");
    modeMockupBtn.classList.remove("active");
    document.body.classList.add("wireframe-mode");
    state.viewMode = "wireframe";
  });

  // 5. Overlay Checkboxes
  toggleGrid.addEventListener("change", (e) => {
    state.overlays.grid = e.target.checked;
    if (e.target.checked) {
      gridOverlay.classList.remove("hidden");
    } else {
      gridOverlay.classList.add("hidden");
    }
  });

  toggleSpacing.addEventListener("change", (e) => {
    state.overlays.spacing = e.target.checked;
    if (e.target.checked) {
      document.body.classList.add("show-spacing-active");
      applySpacingClasses();
    } else {
      document.body.classList.remove("show-spacing-active");
      removeSpacingClasses();
    }
  });

  toggleVectors.addEventListener("change", (e) => {
    state.overlays.vectors = e.target.checked;
    if (e.target.checked) {
      vectorsOverlay.classList.remove("hidden");
      drawFlowVectors();
    } else {
      vectorsOverlay.classList.add("hidden");
      vectorsOverlay.innerHTML = ""; // Clear SVG
    }
  });

  // Dynamic injection of layout blocks for spacing visualization
  function applySpacingClasses() {
    // Select elements inside canvas and apply spacing highlights
    const flexContainers = wireframeCanvas.querySelectorAll(
      ".layout-flex, .wire-header, .role-tabs, .mock-ctas",
    );
    flexContainers.forEach((el) => el.classList.add("layout-flex-indicator"));

    const paddingContainers = wireframeCanvas.querySelectorAll(
      ".layout-box-padding, .mock-hero, .mock-section, .auth-card, .dash-sidebar, .dash-main-body, .dash-card",
    );
    paddingContainers.forEach((el) => el.classList.add("layout-box-padding"));
  }

  function removeSpacingClasses() {
    const flexContainers = wireframeCanvas.querySelectorAll(
      ".layout-flex-indicator",
    );
    flexContainers.forEach((el) =>
      el.classList.remove("layout-flex-indicator"),
    );
  }

  // Draw SVG Flow Vectors connecting buttons/elements
  function drawFlowVectors() {
    vectorsOverlay.innerHTML = ""; // Reset SVG

    // Add marker definition for arrowhead
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const marker = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "marker",
    );
    marker.setAttribute("id", "arrowhead");
    marker.setAttribute("markerWidth", "10");
    marker.setAttribute("markerHeight", "7");
    marker.setAttribute("refX", "8");
    marker.setAttribute("refY", "3.5");
    marker.setAttribute("orient", "auto");

    const polygon = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polygon",
    );
    polygon.setAttribute("points", "0 0, 10 3.5, 0 7");
    polygon.setAttribute("class", "flow-vector-marker");

    marker.appendChild(polygon);
    defs.appendChild(marker);
    vectorsOverlay.appendChild(defs);

    const canvasRect = wireframeCanvas.getBoundingClientRect();

    if (state.activePage === "homepage") {
      // Draw arrow from SignUp button to Registration page
      const signUpBtn = wireframeCanvas.querySelector(".btn-register");
      if (signUpBtn) {
        createSvgArrow(
          signUpBtn,
          null,
          "Register Flow (Worker/Client onboarding)",
          { x: 800, y: 300 },
        );
      }

      const partnerBtn = wireframeCanvas.querySelector(".btn-partner");
      if (partnerBtn) {
        createSvgArrow(partnerBtn, null, "Diaspora Partner Path", {
          x: 500,
          y: 600,
        });
      }
    } else if (state.activePage === "login") {
      const submitBtn = wireframeCanvas.querySelector(".btn-submit-login");
      if (submitBtn) {
        createSvgArrow(submitBtn, null, "API Verification ➔ Dashboard Route", {
          x: 500,
          y: 700,
        });
      }
    } else if (state.activePage === "register") {
      const submitReg = wireframeCanvas.querySelector(".btn-submit-register");
      if (submitReg) {
        createSvgArrow(
          submitReg,
          null,
          "Creates pending node in DB ➔ Route to Login",
          { x: 500, y: 700 },
        );
      }
    } else if (state.activePage === "worker-dashboard") {
      const submitTask = wireframeCanvas.querySelector(".btn-submit-task");
      if (submitTask) {
        createSvgArrow(submitTask, null, "Trigger Task Submission Modal", {
          x: 600,
          y: 550,
        });
      }
    }
  }

  function createSvgArrow(startEl, endEl, label, fallbackCoords) {
    const canvasRect = wireframeCanvas.getBoundingClientRect();
    const startRect = startEl.getBoundingClientRect();

    // Start coordinates relative to canvas
    const x1 = startRect.left - canvasRect.left + startRect.width / 2;
    const y1 = startRect.top - canvasRect.top + startRect.height / 2;

    let x2 = fallbackCoords.x;
    let y2 = fallbackCoords.y;

    if (endEl) {
      const endRect = endEl.getBoundingClientRect();
      x2 = endRect.left - canvasRect.left + endRect.width / 2;
      y2 = endRect.top - canvasRect.top + endRect.height / 2;
    }

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    // Draw a curved line (quadratic bezier)
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2 - 40; // curve offset
    path.setAttribute("d", `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`);
    path.setAttribute("class", "flow-vector-arrow");
    vectorsOverlay.appendChild(path);

    // Text label
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", mx);
    text.setAttribute("y", my - 10);
    text.setAttribute("fill", "var(--text-secondary)");
    text.setAttribute("font-size", "10px");
    text.setAttribute("font-family", "Space Grotesk");
    text.setAttribute("text-anchor", "middle");
    text.textContent = label;
    vectorsOverlay.appendChild(text);
  }

  // --- DRAGGABLE RESIZER SYSTEM ---
  const setupResizer = (resizerId, panelId, isRight) => {
    const resizer = document.getElementById(resizerId);
    const panel = document.getElementById(panelId);
    if (!resizer || !panel) return;

    resizer.addEventListener("mousedown", (e) => {
      e.preventDefault();
      document.body.classList.add("dragging");
      resizer.classList.add("active");

      const onMouseMove = (moveEvent) => {
        let newWidth;
        if (isRight) {
          newWidth = window.innerWidth - moveEvent.clientX;
          if (newWidth >= 220 && newWidth <= 450) {
            panel.style.width = `${newWidth}px`;
          }
        } else {
          newWidth = moveEvent.clientX;
          if (newWidth >= 180 && newWidth <= 400) {
            panel.style.width = `${newWidth}px`;
          }
        }
        // Force SVG vectors redraw if active, since canvas bounds might have changed
        if (state.overlays.vectors) {
          drawFlowVectors();
        }
      };

      const onMouseUp = () => {
        document.body.classList.remove("dragging");
        resizer.classList.remove("active");
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    });
  };

  setupResizer("left-resizer", "left-sidebar", false);
  setupResizer("right-resizer", "right-inspector", true);

  // --- MOBILE DRAWER TOGGLES ---
  const mobileSidebarToggle = document.getElementById("mobile-sidebar-toggle");
  const mobileInspectorToggle = document.getElementById("mobile-inspector-toggle");
  const leftSidebar = document.getElementById("left-sidebar");
  const rightInspector = document.getElementById("right-inspector");

  if (mobileSidebarToggle && leftSidebar) {
    mobileSidebarToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      leftSidebar.classList.toggle("open");
      if (rightInspector) rightInspector.classList.remove("open");
    });
  }

  if (mobileInspectorToggle && rightInspector) {
    mobileInspectorToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      rightInspector.classList.toggle("open");
      if (leftSidebar) leftSidebar.classList.remove("open");
    });
  }

  // Close overlays when clicking in main canvas area
  const mainCanvas = document.querySelector(".canvas-area");
  if (mainCanvas) {
    mainCanvas.addEventListener("click", () => {
      if (leftSidebar) leftSidebar.classList.remove("open");
      if (rightInspector) rightInspector.classList.remove("open");
    });
  }
});
