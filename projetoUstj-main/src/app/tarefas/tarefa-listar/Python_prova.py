class horario:
    def init (self, hora, minuto, segundo):
        self.hora = hora 
        self.minuto = minuto 
        self.segundo = segundo

        def repr(self):
            return str(self.hora)+":" + str (self.minuto) + ":" + str (self.segundo)

            h = horario (10, 40, 30)
            print (h)
