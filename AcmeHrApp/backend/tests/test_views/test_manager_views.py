from ..set_up import set_up_departments, set_up_manager, set_up_regular_employee
from typing import OrderedDict
from django.test import TestCase
from datetime import datetime
import unittest
import xmlrunner


class ManagerViewTestCase(TestCase):
    def setUp(self):
        set_up_departments()
        set_up_manager()
        set_up_regular_employee()

    def test_get_employee_details_correct_emp_no(self):
        response = self.client.get(
            "/managers/getEmployeeDetails",
            {"empNo": "777777", "accessibility": "managerHR"},
            HTTP_ACCEPT="application/json",
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["user"]["userInfo"]["emp_no"], 777777)
        self.assertEqual(
            datetime.strftime(
                response.data["user"]["userInfo"]["birth_date"], "%Y-%m-%d"
            ),
            "1999-02-02",
        )
        self.assertEqual(response.data["user"]["userInfo"]["first_name"], "Regular")
        self.assertEqual(response.data["user"]["userInfo"]["last_name"], "Employee")
        self.assertEqual(response.data["user"]["userInfo"]["gender"], "F")
        self.assertEqual(
            datetime.strftime(
                response.data["user"]["userInfo"]["hire_date"], "%Y-%m-%d"
            ),
            "2010-01-01",
        )
        self.assertEqual(
            response.data["salaryInfo"],
            [
                OrderedDict(
                    [
                        ("emp_no", 777777),
                        ("salary", 60000),
                        ("from_date", "2014-01-01"),
                        ("to_date", "9999-01-01"),
                    ]
                ),
                OrderedDict(
                    [
                        ("emp_no", 777777),
                        ("salary", 50000),
                        ("from_date", "2012-01-01"),
                        ("to_date", "2014-01-01"),
                    ]
                ),
                OrderedDict(
                    [
                        ("emp_no", 777777),
                        ("salary", 40000),
                        ("from_date", "2010-01-01"),
                        ("to_date", "2012-01-01"),
                    ]
                ),
            ],
        )
        self.assertEqual(
            response.data["titleInfo"],
            [
                OrderedDict(
                    [
                        ("emp_no", 777777),
                        ("title", "Senior Staff"),
                        ("from_date", "2012-01-01"),
                        ("to_date", "9999-01-01"),
                    ]
                ),
                OrderedDict(
                    [
                        ("emp_no", 777777),
                        ("title", "Staff"),
                        ("from_date", "2010-01-01"),
                        ("to_date", "2012-01-01"),
                    ]
                ),
            ],
        )
        self.assertEqual(
            response.data["employeesManager"],
            {
                "emp_no": 8888888,
                "birth_date": "1990-01-01",
                "first_name": "Practice",
                "last_name": "Test",
                "gender": "M",
                "hire_date": "2000-01-01",
            },
        )

    def test_get_employee_details_incorrect_emp_no(self):
        response = self.client.get(
            "/managers/getEmployeeDetails",
            {"empNo": "7777777", "accessibility": "managerHR"},
            HTTP_ACCEPT="application/json",
        )
        self.assertEqual(response.status_code, 500)
        self.assertEqual(response.data, "Internal Server Error")

    def test_get_my_department_info_view(self):
        response = self.client.get(
            "/managers/getMyDepartmentInfo",
            {"deptNo": "d903"},
            HTTP_ACCEPT="application/json",
        )
        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(
            response.data["departmentEmployees"][0],
            OrderedDict(
                [
                    ("emp_no", 777777),
                    ("birth_date", "1999-02-02"),
                    ("first_name", "Regular"),
                    ("last_name", "Employee"),
                    ("gender", "F"),
                    ("hire_date", "2010-01-01"),
                    (
                        "title",
                        OrderedDict(
                            [
                                ("emp_no", 777777),
                                ("title", "Senior Staff"),
                                ("from_date", "2012-01-01"),
                                ("to_date", "9999-01-01"),
                            ]
                        ),
                    ),
                ]
            ),
            OrderedDict(
                [
                    ("emp_no", 8888888),
                    ("birth_date", "1990-01-01"),
                    ("first_name", "Practice"),
                    ("last_name", "Test"),
                    ("gender", "M"),
                    ("hire_date", "2000-01-01"),
                    (
                        "title",
                        OrderedDict(
                            [
                                ("emp_no", 8888888),
                                ("title", "Manager"),
                                ("from_date", "2000-01-01"),
                                ("to_date", "9999-01-01"),
                            ]
                        ),
                    ),
                ]
            ),
        )
        self.assertDictEqual(
            response.data["department"], {"dept_no": "d903", "dept_name": "Testing3"}
        )


if __name__ == "__main__":
    unittest.main(
        testRunner=xmlrunner.XMLTestRunner(output="test-reports"),
        # these make sure that some options that are not applicable
        # remain hidden from the help menu.
        failfast=False,
        buffer=False,
        catchbreak=False,
    )
