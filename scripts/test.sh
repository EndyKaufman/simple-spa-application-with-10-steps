python manage.py migrate
python manage.py collectstatic --noinput
python manage.py test
npm run test --prefix ./frontend