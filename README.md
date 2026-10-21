# Kasi Frost

A responsive React + Vite website for Kasi Frost slushies and frozen drink concepts. This starter uses editable sample prices, placeholder business details, and a front-end enquiry/cart preview. It does not take payments or send enquiries.

## Requirements

Install Node.js (which includes npm) and Git for Windows. Then open this project folder in VS Code.

## Run locally

Open the VS Code terminal (`Terminal` > `New Terminal`) and run:

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`. To check the production build, run `npm run build`.

## Update the menu

Edit `src/data/products.js` to change drink names, descriptions, colours, sample prices, sizes, availability, featured status, and image paths. Product images can be added under `public/` and referenced from the product's `image` value; leave it `null` to use the CSS illustration. Edit `src/data/business.js` to update the phone, email, location, opening hours, social profile links, and delivery areas/fees. The adult drinks are clearly marked as proposed concepts and are not orderable. Confirm all prices and delivery details before publishing.

## GitHub: connect this folder

This project folder is a local scaffold. If you already cloned the repository, Git is installed, and this folder is its checkout, skip `git init` and `git remote add` below. Otherwise install Git for Windows, open a new VS Code terminal, and run these commands from this project folder. The GitHub repository is expected to be empty:

```powershell
git init
git branch -M main
git remote add origin https://github.com/Nomusa-tech/kasi-Frost.git
git add .
git commit -m "Build Kasi Frost website"
git push -u origin main
```

When prompted, sign in to GitHub through the browser or VS Code. Never put a password or access token in the project files. If Git reports that `origin` already exists, check it with `git remote -v` and do not add it a second time.

After editing, save files, then use Source Control in VS Code to review changes, enter a commit message, select **Commit**, and select **Sync Changes** or **Push** to publish.

## Deploy on Render

This project includes `render.yaml`. Render uses it to install the exact dependencies from `package-lock.json` with `npm ci`, run `npm run build`, and publish the generated `dist` folder as a static site. No backend or environment variables are needed for the current preview site.

1. Push the project to the `main` branch of the GitHub repository using the GitHub steps above.
2. Sign in to Render and choose **New** > **Blueprint**.
3. Connect the `Nomusa-tech/kasi-Frost` GitHub repository and approve access if Render asks.
4. Render finds `render.yaml`. Review the service, then create it.
5. Wait for the deploy to finish and open the `.onrender.com` URL shown on the service page.

Automatic deploys are enabled in `render.yaml`, so later pushes to `main` trigger a new deploy. The cart and contact form remain previews: the site does not process orders, payments, or send form messages. Add a real form service before relying on contact submissions.

## Ordering and responsible alcohol presentation

The cart is a front-end enquiry preview for non-alcoholic drinks only. There is no checkout, payment processing, order persistence, or form delivery. The adult section contains proposed concepts and uses a self-declaration gate for the preview; that checkbox is not age or identity verification. Do not enable alcohol sales without confirming applicable South African licensing and legal requirements and implementing appropriate age/identity verification on a secure backend. Use a trusted payment provider if payments are added; do not collect card details directly.
