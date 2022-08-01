from ..set_up import set_up_manager, set_up_departments
import json
from typing import OrderedDict
from django.test import TestCase
from datetime import datetime
import unittest
import xmlrunner



class UserViewTestCase(TestCase):
    def setUp(self):
        set_up_departments()
        set_up_manager()
        
    def test_login_manager_user_view(self):
        login_info = {"employeeID": "8888888", "password": "1990-01-01"}
        response = self.client.post('/users/login', json.dumps(login_info),
                          content_type="application/json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['user']['userInfo']['emp_no'], 8888888)
        self.assertEqual(datetime.strftime(
            response.data['user']['userInfo']['birth_date'], '%Y-%m-%d'), '1990-01-01')
        self.assertEqual(response.data['user']
                         ['userInfo']['first_name'], 'Practice')
        self.assertEqual(response.data['user']
                         ['userInfo']['last_name'], 'Test')
        self.assertEqual(response.data['user']['userInfo']['gender'], 'M')
        self.assertEqual(datetime.strftime(
            response.data['user']['userInfo']['hire_date'], '%Y-%m-%d'), '2000-01-01')
        self.assertEqual(response.data['user']['accessibility'], 'manager')


    def test_login_incorrect_password(self):
        login_info = {"employeeID": "8888888", "password": "1990-01-20"}
        response = self.client.post('/users/login', json.dumps(login_info),
                          content_type="application/json")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data, 'Incorrect Password')

    def test_login_incorrect_id(self):
        login_info = {"employeeID": "99999999", "password": "1990-01-01"}
        response = self.client.post('/users/login', json.dumps(login_info),
                          content_type="application/json")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data, 'Employee ID Doesnt Exist')

    def test_my_information(self):
        response = self.client.get('/users/getMyInformation', {'employeeID': '8888888'}, HTTP_ACCEPT='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['deptInfo'], [{'departments': {'dept_no': 'd903', 'dept_name': 'Testing3'}, 'dept_emp': {
                         'emp_no': 8888888, 'from_date': '2000-01-01', 'to_date': '9999-01-01', 'dept_no': 'd903'}}])
        self.assertDictEqual(response.data['salaryInfo'][0], OrderedDict(
            [('emp_no', 8888888), ('salary', 100000), ('from_date', '2000-01-01'), ('to_date', '9999-01-01')]))
        self.assertDictEqual(response.data['titleInfo'][0], OrderedDict(
            [('emp_no', 8888888), ('title', 'Manager'), ('from_date', '2000-01-01'), ('to_date', '9999-01-01')]))

if __name__ == '__main__':
    unittest.main(
        testRunner=xmlrunner.XMLTestRunner(output='test-reports'),
        # these make sure that some options that are not applicable
        # remain hidden from the help menu.
        failfast=False, buffer=False, catchbreak=False)
