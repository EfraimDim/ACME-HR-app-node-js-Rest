from xmlrunner.extra.djangotestrunner import XMLTestRunner


class NoDBXMLTestRunner(XMLTestRunner):
    def setup_databases(self, *args, **kwargs):
        pass

    def teardown_databases(self, *args, **kwargs):
        pass
