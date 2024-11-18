# Save Anime List as TXT

A Script that extracts anime titles, release dates, and categories from MyAnimeList's seasonal anime pages. The data is formatted and can be downloaded as a `.txt` file by clicking the "Simpan List" button added to the navigation bar.

## Features

- Adds a **"Simpan List"** button to the navigation bar next to the **"Archive"** link.
- Extracts:
  - **Anime Title** (e.g., *Dandadan*).
  - **Start Date** formatted as `[YYMMDD]` (e.g., `250110` for January 10, 2025).
  - **Category Header** (e.g., `【TV (New)】`).
- Downloads the extracted data as a `.txt` file.

## Example Output

If the page contains anime data like:

```html
<div class="anime-header">TV (New)</div>
<div class="js-anime-category-producer">
    <a class="link-title">Dandadan</a>
    <span class="js-start_date">20250110</span>
</div>
```

The downloaded `anime_list.txt` file will contain:

```scss
[250110] Dandadan 【TV (New)】
```

## Installation

1. **Install Tampermonkey**  
   Download and install the [Tampermonkey extension](https://www.tampermonkey.net/) for your browser.

2. **Add the Script**  
   - Open the **Tampermonkey Dashboard**.
   - Click **Create a New Script**.
   - Replace the default content with the script from this repository.
   - Save the script.

3. **Visit MyAnimeList**  
   Go to any seasonal anime page on [MyAnimeList](https://myanimelist.net/anime/season).

## How to Use

1. Open a seasonal anime page (e.g., [https://myanimelist.net/anime/season](https://myanimelist.net/anime/season)).
2. Look for the **"Simpan List"** button in the navigation bar next to the **"Archive"** link.
3. Click the **"Simpan List"** button.
4. A `.txt` file with the extracted anime list will be downloaded.
