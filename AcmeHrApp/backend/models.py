from django.db import models

# Create your models here.


class Department(models.Model):
    dept_no = models.CharField(primary_key=True, max_length=4)
    dept_name = models.CharField(unique=True, max_length=40)

    class Meta:
        managed = False
        db_table = 'departments'


class Employee(models.Model):
    emp_no = models.BigIntegerField(primary_key=True)
    birth_date = models.DateField()
    first_name = models.CharField(max_length=14)
    last_name = models.CharField(max_length=16)
    gender = models.TextField()  # This field type is a guess.
    hire_date = models.DateField()

    class Meta:
        managed = False
        db_table = 'employees'


class DeptEmp(models.Model):
    emp_no = models.OneToOneField(
        Employee, models.DO_NOTHING, db_column='emp_no', primary_key=True)
    dept_no = models.ForeignKey(
        Department, models.DO_NOTHING, db_column='dept_no')
    from_date = models.DateField()
    to_date = models.DateField()

    class Meta:
        managed = False
        db_table = 'dept_emp'
        unique_together = [('emp_no', 'dept_no')]


class DeptManager(models.Model):
    emp_no = models.OneToOneField(
        Employee, models.DO_NOTHING, db_column='emp_no', primary_key=True)
    dept_no = models.ForeignKey(
        Department, models.DO_NOTHING, db_column='dept_no')
    from_date = models.DateField()
    to_date = models.DateField()

    class Meta:
        managed = False
        db_table = 'dept_manager'
        unique_together = [('emp_no', 'dept_no')]


class Salary(models.Model):
    emp_no = models.OneToOneField(
        Employee, models.DO_NOTHING, db_column='emp_no', primary_key=True)
    salary = models.BigIntegerField()
    from_date = models.DateField()
    to_date = models.DateField()

    class Meta:
        managed = False
        db_table = 'salaries'
        unique_together = [('emp_no', 'from_date')]


class Title(models.Model):
    emp_no = models.OneToOneField(
        Employee, models.DO_NOTHING, db_column='emp_no', primary_key=True)
    title = models.CharField(max_length=50)
    from_date = models.DateField()
    to_date = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'titles'
        unique_together = [('emp_no', 'title', 'from_date')]
