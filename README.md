# Adamite Bookmark Manager

Bookmark manager built with Django REST Framework and React.

## Set Up

**Note:** It is recommended that you use PostgreSQL database for this project,
otherwise you will have to modify `settings.py`.

Clone the repository

``` bash
git clone https://github.com/bachokviktor/adamite-bookmark-manager.git && cd adamite-bookmark-manager
```

### Backend

Change to the `backend` directory

``` bash
cd backend
```

Create a virtual environment

``` bash
python -m venv .venv
```

Activate it

``` bash
source .venv/bin/activate
```

Install dependencies

``` bash
pip install -r requirements.txt
```

Set the environent variables in `.env.example` and rename it to `.env`

``` bash
mv .env.example .env
```

Run migrations

``` bash
python manage.py migrate
```

Run the development server

``` bash
python manage.py runserver
```

### Frontend

Change to the `frontend` directory

``` bash
cd frontend
```

Set the environent variables in `.env.example` and rename it to `.env`

``` bash
mv .env.example .env
```

Install dependencies

``` bash
npm install
```

Run the development server

``` bash
npm run dev
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
