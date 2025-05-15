import "package:flutter/material.dart";
import 'package:sqflite/sqflite.dart';
import 'package:avc_form/app_database.dart';
import 'dart:convert';
import 'package:flutter/foundation.dart' show kDebugMode;
import 'package:http/http.dart' as http;

void main() {
  runApp(DiseasePredictionApp());
}

class DiseasePredictionApp extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: LoginPage(),
    );
  }
}

class LoginPage extends StatelessWidget {
  final TextEditingController _usernameController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  bool loginValid = false;

  LoginPage({super.key});

  bool checkLogin() {
    // Aqui você pode adicionar sua lógica para verificar o login
    if (_usernameController.text == 'doctor' &&
        _passwordController.text == '123') {
      return true;
    } else {
      return false;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Color.fromRGBO(11,143,172,1.0),
        body: SingleChildScrollView(
          child: Column(
            children: <Widget>[
              // Imagem de fundo
              Container(
                height: MediaQuery.of(context).size.height,
                width: MediaQuery.of(context).size.width,
                decoration: BoxDecoration(
                  image: DecorationImage(
                    image: AssetImage('images/background.jpeg'),
                    fit: BoxFit.cover,
                  ),
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    // Texto centralizado
                    Text(
                      "AURAS",
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 40,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    SizedBox(height: 30), // Espaço entre o texto e o próximo conteúdo
                    // Espaço reservado para o formulário de login
                    Padding(
                      padding: const EdgeInsets.all(30.0),
                      child: Column(
                        children: <Widget>[
                          Container(
                            padding: const EdgeInsets.all(5),
                            decoration: BoxDecoration(
                              color: Colors.white,
                              borderRadius: BorderRadius.circular(10),
                              border: Border.all(
                                color: const Color.fromRGBO(11,143,172,1.0),
                              ),
                              boxShadow: const [
                                BoxShadow(
                                  color: Color.fromRGBO(11,143,172,1.0),
                                  blurRadius: 20.0,
                                  offset: Offset(0, 10),
                                ),
                              ],
                            ),
                            child: Column(
                              children: <Widget>[
                                Container(
                                  padding: const EdgeInsets.all(8.0),
                                  decoration: const BoxDecoration(
                                    border: Border(
                                      bottom: BorderSide(
                                        color: Color.fromRGBO(143, 148, 251, 1),
                                      ),
                                    ),
                                  ),
                                  child: TextField(
                                    controller: _usernameController,
                                    decoration: InputDecoration(
                                      border: InputBorder.none,
                                      hintText: "Nome de usuário",
                                      hintStyle: TextStyle(color: Colors.grey[700]),
                                    ),
                                  ),
                                ),
                                Container(
                                  padding: const EdgeInsets.all(8.0),
                                  child: TextField(
                                    controller: _passwordController,
                                    obscureText: true,
                                    decoration: InputDecoration(
                                      border: InputBorder.none,
                                      hintText: "Senha",
                                      hintStyle: TextStyle(color: Colors.grey[700]),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                          SizedBox(height: 30),
                          GestureDetector(
                            onTap: () {
                              loginValid = checkLogin();
                              if (loginValid) {
                                Navigator.of(context).push(
                                  MaterialPageRoute(
                                    builder: (context) => HomePage(),
                                  ),
                                );
                              } else {
                                showDialog(
                                  context: context,
                                  builder: (BuildContext context) {
                                    return AlertDialog(
                                      title: const Text('Login inválido'),
                                      content: const Text('Usuário ou senha incorretos.'),
                                      actions: <Widget>[
                                        TextButton(
                                          onPressed: () {
                                            Navigator.of(context).pop();
                                          },
                                          child: const Text('OK'),
                                        ),
                                      ],
                                    );
                                  },
                                );
                              }
                            },
                            child: Container(
                              decoration: BoxDecoration(
                                gradient: const LinearGradient(
                                  colors: [
                                    Color.fromRGBO(9, 21, 253, 1),
                                    Color.fromRGBO(9, 21, 253, 1),
                                  ],
                                ),
                                borderRadius: BorderRadius.circular(20.0),
                              ),
                              padding: const EdgeInsets.symmetric(horizontal: 100, vertical: 15),
                              child: const Text(
                                'Confirmar',
                                style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 18,
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        )
    );
  }
}


//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List<DiseasePrediction> diseaseprediction = [];
  
  @override
  void initState() {
    super.initState();
    _carregarDisease();
  }

  void _carregarDisease() async {
    print("Carregando Diagnóstico...");
    List<DiseasePrediction> diseaseCarregados = await DatabaseHelper.instance.findAll();
    setState(() {
      diseaseprediction = diseaseCarregados;
    });
    print("diagnósticos carregados: ${diseaseprediction.length}");
  }
  
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          leading: const Icon(Icons.home),
          actions: [
            IconButton(
                icon: const Icon(Icons.logout),
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => (LoginPage())),
                  );
                }),
          ],
          backgroundColor: const Color.fromRGBO(11,143,172,1),
        ),
        body: SingleChildScrollView(
          child: Column(
            children: <Widget>[
              SizedBox(
                height: 400,
                child: Column(
                  children: [
                    Align(
                      alignment: Alignment.topCenter,
                      child: Container(
                        margin: const EdgeInsets.only(top: 100),
                        child: const Text(
                          "Bem vindo ao Auras",
                          style: TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.bold
                          ),
                          maxLines: 2,
                        ),
                      ),
                    ),
                    Align(
                      alignment: Alignment.topCenter,
                      child: Container(
                        margin: const EdgeInsets.only(top: 30),
                        child: GestureDetector(
                          onTap: () {
                            Navigator.of(context).push(
                              MaterialPageRoute(
                                builder: (context) => FormularioDisease(_adicionarDisease),
                              ),
                            );
                          },
                          child: Container(
                            margin: const EdgeInsets.only(top: 10),
                            width: MediaQuery.of(context).size.width - 30,
                            height: 100,
                            decoration: BoxDecoration(
                              gradient: const LinearGradient(colors: [
                                Color.fromRGBO(11,143,172,1),
                                Color.fromRGBO(11,143,172,1),
                              ]),
                              borderRadius: BorderRadius.circular(40),
                            ),
                            child: const Center(
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  SizedBox(width: 10),
                                  Text(
                                    "REALIZAR PREVISÃO",
                                    style: TextStyle(color: Colors.white, fontSize: 20),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                    Align(
                      alignment: Alignment.topCenter,
                      child: Container(
                        margin: const EdgeInsets.only(top: 10),
                        child: GestureDetector(
                          onTap: () {
                            Navigator.of(context).push(
                              MaterialPageRoute(
                                builder: (context) => DiseaseList(),
                              ),
                            );
                          },
                          child: Container(
                            margin: const EdgeInsets.only(top: 10),
                            width: MediaQuery.of(context).size.width - 30,
                            height: 100,
                            decoration: BoxDecoration(
                              gradient: const LinearGradient(colors: [
                                Color.fromRGBO(11,143,172,1),
                                Color.fromRGBO(11,143,172,1),
                              ]),
                              borderRadius: BorderRadius.circular(40),
                            ),
                            child: const Center(
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  SizedBox(width: 10),
                                  Text(
                                    "DIAGNÓSTICOS",
                                    style: TextStyle(color: Colors.white, fontSize: 20),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              Container(
                height: 400,
                decoration: const BoxDecoration(
                    image: DecorationImage(
                        image: AssetImage('assets/images/background-2.png'),
                        fit: BoxFit.fill)),
              )
            ],
          ),
        ));
  }

  void _adicionarDisease(DiseasePrediction novoDiseasePrediction) async {
    print("Adicionando novo Diagnóstico para: ${novoDiseasePrediction.name}");
    await DatabaseHelper.instance.insertDisease(novoDiseasePrediction);
    print("Diagnóstico adicionado para: ${novoDiseasePrediction.name}");
    _carregarDisease();
  }
}

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\


class DiseaseList extends StatefulWidget {
  @override
  _DiseaseListState createState() => _DiseaseListState();
}

class _DiseaseListState extends State<DiseaseList> {
  List<DiseasePrediction> diseaseprediction = [];

  @override
  void initState() {
    super.initState();
    _carregarDisease();
  }

  void _carregarDisease() async {
    print("Carregando Diagnóstico...");
    List<DiseasePrediction> diseaseCarregados = await DatabaseHelper.instance.findAll();
    setState(() {
      diseaseprediction = diseaseCarregados;
    });
    print("diagnósticos carregados: ${diseaseprediction.length}");
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Color.fromRGBO(0, 56, 168, 1.0),
        title: Text(
          'Diagnóstico',
          style: TextStyle(
            color: Colors.white,
            fontSize: 30,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
      body: ListView.builder(
        itemCount: diseaseprediction.length,
        itemBuilder: (context, index) {
          final DiseasePrediction diseasePrediction = diseaseprediction[index];
          return DiseasePredictionItem(diseasePrediction);
        },
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: Color.fromRGBO(0, 56, 168, 1.0),
        onPressed: () {
          Navigator.of(context).push(
          MaterialPageRoute(
            builder: (context) => FormularioDisease(_adicionarDisease),
          ),
        );
        },
        child: Icon(
          Icons.add,
          color: Colors.white,
          size: 35.0,
        ),
      ),
    );
  }

  void _adicionarDisease(DiseasePrediction novoDiseasePrediction) async {
    print("Adicionando novo Diagnóstico para: ${novoDiseasePrediction.name}");
    await DatabaseHelper.instance.insertDisease(novoDiseasePrediction);
    print("Diagnóstico adicionado para: ${novoDiseasePrediction.name}");
    _carregarDisease();
  }
}

class DiseasePredictionItem extends StatelessWidget {
  final DiseasePrediction diseaseprediction;

  DiseasePredictionItem(this.diseaseprediction);

  @override
  Widget build(BuildContext context) {
    String details = 'glucose: ${diseaseprediction.glucose}\n';
    'cholesterol: ${diseaseprediction.cholesterol}\n';
    'hemoglobin: ${diseaseprediction.hemoglobin}\n';
    'platelets: ${diseaseprediction.platelets}\n';
    'white_blood_cells: ${diseaseprediction.white_blood_cells}\n';
    'red_blood_cells: ${diseaseprediction.red_blood_cells}\n';
    'hematocrit: ${diseaseprediction.hematocrit}\n';
    'mean_corpuscular_volume: ${diseaseprediction.mean_corpuscular_volume}\n';
    'mean_corpuscular_hemoglobin: ${diseaseprediction.mean_corpuscular_hemoglobin}\n';
    'mean_corpuscular_hemoglobin_concentration: ${diseaseprediction.mean_corpuscular_hemoglobin_concentration}\n';
    'insulin: ${diseaseprediction.insulin}\n';
    'bmi: ${diseaseprediction.bmi}\n';
    'systolic_blood_pressure: ${diseaseprediction.systolic_blood_pressure}\n';
    'diastolic_blood_pressure: ${diseaseprediction.diastolic_blood_pressure}\n';
    'triglycerides: ${diseaseprediction.triglycerides}\n';
    'hba1c: ${diseaseprediction.hba1c}\n';
    'ldl_cholesterol: ${diseaseprediction.ldl_cholesterol}\n';
    'hdl_cholesterol: ${diseaseprediction.hdl_cholesterol}\n';
    'alt: ${diseaseprediction.alt}\n';
    'ast: ${diseaseprediction.ast}\n';
    'heart_rate: ${diseaseprediction.heart_rate}\n';
    'creatinine: ${diseaseprediction.creatinine}\n';
    'troponin: ${diseaseprediction.troponin}\n';
    'c_reactive_protein: ${diseaseprediction.c_reactive_protein}\n';
    'disease: ${diseaseprediction.disease}\n';

    return Card(
      child: ListTile(
        title: Text(
          diseaseprediction.name,
          style: TextStyle(fontSize: 24.0),
        ),
        subtitle: Text(
          details,
          style: TextStyle(fontSize: 16.0),
        ),
      ),
    );
  }
}

class DiseasePrediction {
  final String name;
  final String cpf;
  final String dtnascimento;
  final double glucose;
  final double cholesterol;
  final double hemoglobin;
  final double platelets;
  final double white_blood_cells;
  final double red_blood_cells;
  final double hematocrit;
  final double mean_corpuscular_volume;
  final double mean_corpuscular_hemoglobin;
  final double mean_corpuscular_hemoglobin_concentration;
  final double insulin;
  final double bmi;
  final double systolic_blood_pressure;
  final double diastolic_blood_pressure;
  final double triglycerides;
  final double hba1c;
  final double ldl_cholesterol;
  final double hdl_cholesterol;
  final double alt;
  final double ast;
  final double heart_rate;
  final double creatinine;
  final double troponin;
  final double c_reactive_protein;
  final int disease;

  DiseasePrediction(
      this.name,
      this.cpf,
      this.dtnascimento,
      this.glucose,
      this.cholesterol,
      this.hemoglobin,
      this.platelets,
      this.white_blood_cells,
      this.red_blood_cells,
      this.hematocrit,
      this.mean_corpuscular_volume,
      this.mean_corpuscular_hemoglobin,
      this.mean_corpuscular_hemoglobin_concentration,
      this.insulin,
      this.bmi,
      this.systolic_blood_pressure,
      this.diastolic_blood_pressure,
      this.triglycerides,
      this.hba1c,
      this.ldl_cholesterol,
      this.hdl_cholesterol,
      this.alt,
      this.ast,
      this.heart_rate,
      this.creatinine,
      this.troponin,
      this.c_reactive_protein,
      this.disease);

  Map<String, dynamic> toMap() {
    return {
      'name': name,
      'cpf': cpf,
      'dtnascimento': dtnascimento,
      'glucose': glucose.toDouble(),
      'cholesterol': cholesterol.toDouble(),
      'hemoglobin': hemoglobin.toDouble(),
      'platelets': platelets.toDouble(),
      'white_blood_cells': white_blood_cells.toDouble(),
      'red_blood_cells': red_blood_cells.toDouble(),
      'hematocrit': hematocrit.toDouble(),
      'mean_corpuscular_volume': mean_corpuscular_volume.toDouble(),
      'mean_corpuscular_hemoglobin': mean_corpuscular_hemoglobin.toDouble(),
      'mean_corpuscular_hemoglobin_concentration': mean_corpuscular_hemoglobin_concentration.toDouble(),
      'insulin': insulin.toDouble(),
      'bmi': bmi.toDouble(),
      'systolic_blood_pressure': systolic_blood_pressure.toDouble(),
      'diastolic_blood_pressure': diastolic_blood_pressure.toDouble(),
      'triglycerides': triglycerides.toDouble(),
      'hba1c': hba1c.toDouble(),
      'ldl_cholesterol': ldl_cholesterol.toDouble(),
      'hdl_cholesterol': hdl_cholesterol.toDouble(),
      'alt': alt.toDouble(),
      'ast': ast.toDouble(),
      'heart_rate': heart_rate.toDouble(),
      'creatinine': creatinine.toDouble(),
      'troponin': troponin.toDouble(),
      'c_reactive_protein': c_reactive_protein.toDouble(),
      'disease': disease,
    };
  }
}



//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\


class FormularioDisease extends StatefulWidget {
  final Function(DiseasePrediction) onDiseaseAdicionado;

  FormularioDisease(this.onDiseaseAdicionado);

  @override
  _FormDiseasePageState createState() => _FormDiseasePageState();
}



class _FormDiseasePageState extends State<FormularioDisease> {
  final TextEditingController controllername = TextEditingController();
  final TextEditingController controllercpf = TextEditingController();
  final TextEditingController controllerdtnascimento = TextEditingController();
  final TextEditingController controllerglucose = TextEditingController();
  final TextEditingController controllercholesterol = TextEditingController();
  final TextEditingController controllerhemoglobin = TextEditingController();
  final TextEditingController controllerplatelets = TextEditingController();
  final TextEditingController controllerwhite_blood_cells =TextEditingController();
  final TextEditingController controllerred_blood_cells = TextEditingController();
  final TextEditingController controllerhematocrit = TextEditingController();
  final TextEditingController controllermean_corpuscular_volume = TextEditingController();
  final TextEditingController controllermean_corpuscular_hemoglobin = TextEditingController();
  final TextEditingController controllermean_corpuscular_hemoglobin_concentration = TextEditingController();
  final TextEditingController controllerinsulin = TextEditingController();
  final TextEditingController controllerbmi = TextEditingController();
  final TextEditingController controllersystolic_blood_pressure = TextEditingController();
  final TextEditingController controllerdiastolic_blood_pressure = TextEditingController();
  final TextEditingController controllertriglycerides = TextEditingController();
  final TextEditingController controllerhba1c = TextEditingController();
  final TextEditingController controllerldl_cholesterol = TextEditingController();
  final TextEditingController controllerhdl_cholesterol = TextEditingController();
  final TextEditingController controlleralt = TextEditingController();
  final TextEditingController controllerast = TextEditingController();
  final TextEditingController controllerheart_rate = TextEditingController();
  final TextEditingController controllercreatinine = TextEditingController();
  final TextEditingController controllertroponin = TextEditingController();
  final TextEditingController controllerc_reactive_protein = TextEditingController();
  
 String? _mesagem; // Pode ser nulo, inicializado como null

  // Getter para _mesagem
  String? get mesagem => _mesagem;

  // Setter para _mesagem
  set mesagem(String? value) {
    setState(() {
      _mesagem = value;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Color.fromRGBO(0, 56, 168, 1.0),
        title: Text(
          'Novo Diagnóstico',
          style: TextStyle(
            color: Colors.white,
            fontSize: 30,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            children: [
                TextFormField(
                  controller: controllername,
                  decoration: InputDecoration(
                    labelText: 'Nome do Paciente',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  style: TextStyle(
                    fontSize: 24.0,
                  ),
                  validator: (value) {
                    if (value!.isEmpty) {
                      return 'Nome é obrigatório';
                    }
                    return null;
                  },
                ),
                TextFormField(
                  controller: controllercpf,
                  decoration: InputDecoration(
                    labelText: 'Cpf',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  style: TextStyle(
                    fontSize: 24.0,
                  ),
                  validator: (value) {
                    if (value!.isEmpty) {
                      return 'Cpf é obrigatório';
                    }
                    return null;
                  },
                ),
                TextFormField(
                  controller: controllerdtnascimento,
                  decoration: InputDecoration(
                    labelText: 'Data Nascimento',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  style: TextStyle(
                    fontSize: 24.0,
                  ),
                  validator: (value) {
                    if (value!.isEmpty) {
                      return 'Data Nascimento é obrigatório';
                    }
                    return null;
                  },
                ),
                TextFormField(
                  controller: controllerglucose,
                  decoration: InputDecoration(
                    labelText: 'Glucose',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  style: TextStyle(
                    fontSize: 24.0,
                  ),
                  validator: (value) {
                    if (value!.isEmpty) {
                      return 'Glucose é obrigatório';
                    }
                    return null;
                  },
                ),
                TextFormField(
                  controller: controllercholesterol,
                  decoration: InputDecoration(
                    labelText: 'Colesterol',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  style: TextStyle(
                    fontSize: 24.0,
                  ),
                  validator: (value) {
                    if (value!.isEmpty) {
                      return 'Colesterol é obrigatório';
                    }
                    return null;
                  },
                ),
                TextFormField(
                  controller: controllerhemoglobin,
                  decoration: InputDecoration(
                    labelText: 'Hemoglobina',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  style: TextStyle(
                    fontSize: 24.0,
                  ),
                  validator: (value) {
                    if (value!.isEmpty) {
                      return 'Hemoglobina é obrigatório';
                    }
                    return null;
                  },
                ),
                TextFormField(
                  controller: controllerplatelets,
                  decoration: InputDecoration(
                    labelText: 'Plaquetas',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  style: TextStyle(
                    fontSize: 24.0,
                  ),
                  validator: (value) {
                    if (value!.isEmpty) {
                      return 'Plaquetas é obrigatório';
                    }
                    return null;
                  },
                ),
                TextFormField(
                  controller: controllerwhite_blood_cells,
                  decoration: InputDecoration(
                    labelText: 'Células de Sangue Branco',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  style: TextStyle(
                    fontSize: 24.0,
                  ),
                  validator: (value) {
                    if (value!.isEmpty) {
                      return 'Células de Sangue Branco é obrigatório';
                    }
                    return null;
                  },
                ),
                TextFormField(
                  controller: controllerred_blood_cells,
                  decoration: InputDecoration(
                    labelText: 'Glóbulos Vermelhos',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  style: TextStyle(
                    fontSize: 24.0,
                  ),
                  validator: (value) {
                    if (value!.isEmpty) {
                      return 'Glóbulos Vermelhos é obrigatório';
                    }
                    return null;
                  },
                ),
                TextFormField(
                  controller: controllerhematocrit,
                  decoration: InputDecoration(
                    labelText: 'Hematócrito',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  style: TextStyle(
                    fontSize: 24.0,
                  ),
                  validator: (value) {
                    if (value!.isEmpty) {
                      return 'Hematócrito é obrigatório';
                    }
                    return null;
                  },
                ),
                TextFormField(
                  controller: controllermean_corpuscular_volume,
                  decoration: InputDecoration(
                    labelText: 'Volume Corpuscular Médio',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  style: TextStyle(
                    fontSize: 24.0,
                  ),
                  validator: (value) {
                    if (value!.isEmpty) {
                      return 'Volume Corpuscular Médio é obrigatório';
                    }
                    return null;
                  },
                ),
                TextFormField(
                  controller: controllermean_corpuscular_hemoglobin,
                  decoration: InputDecoration(
                    labelText: 'Hemoglobina Corpuscular Média',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  style: TextStyle(
                    fontSize: 24.0,
                  ),
                  validator: (value) {
                    if (value!.isEmpty) {
                      return 'Hemoglobina Corpuscular Média é obrigatório';
                    }
                    return null;
                  },
                ),
                TextFormField(
                  controller:
                      controllermean_corpuscular_hemoglobin_concentration,
                  decoration: InputDecoration(
                    labelText: 'Concentração Média de Hemoglobina Corpuscular',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  style: TextStyle(
                    fontSize: 24.0,
                  ),
                  validator: (value) {
                    if (value!.isEmpty) {
                      return 'Concentração Média de Hemoglobina Corpuscular é obrigatório';
                    }
                    return null;
                  },
                ),
                TextFormField(
                  controller: controllerinsulin,
                  decoration: InputDecoration(
                    labelText: 'Insulina',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  style: TextStyle(
                    fontSize: 24.0,
                  ),
                  validator: (value) {
                    if (value!.isEmpty) {
                      return 'Insulina é obrigatório';
                    }
                    return null;
                  },
                ),
                TextFormField(
                  controller: controllerbmi,
                  decoration: InputDecoration(
                    labelText: 'IMC',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  style: TextStyle(
                    fontSize: 24.0,
                  ),
                  validator: (value) {
                    if (value!.isEmpty) {
                      return 'IMC é obrigatório';
                    }
                    return null;
                  },
                ),
                TextFormField(
                  controller: controllersystolic_blood_pressure,
                  decoration: InputDecoration(
                    labelText: 'Pressão Arterial Sistólica (PAS)',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  style: TextStyle(
                    fontSize: 24.0,
                  ),
                  validator: (value) {
                    if (value!.isEmpty) {
                      return 'Pressão Arterial Sistólica (PAS) é obrigatório';
                    }
                    return null;
                  },
                ),
                TextFormField(
                  controller: controllerdiastolic_blood_pressure,
                  decoration: InputDecoration(
                    labelText: 'Pressão Sanguínea Diastólica (PAD)',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  style: TextStyle(
                    fontSize: 24.0,
                  ),
                  validator: (value) {
                    if (value!.isEmpty) {
                      return 'Pressão Sanguínea Diastólica (PAD) é obrigatório';
                    }
                    return null;
                  },
                ),
                TextFormField(
                  controller: controllertriglycerides,
                  decoration: InputDecoration(
                    labelText: 'Triglicerídeos',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  style: TextStyle(
                    fontSize: 24.0,
                  ),
                  validator: (value) {
                    if (value!.isEmpty) {
                      return 'Triglicerídeos é obrigatório';
                    }
                    return null;
                  },
                ),
                TextFormField(
                  controller: controllerhba1c,
                  decoration: InputDecoration(
                    labelText: 'Hemoglobina Glicada (HbA1c)',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  style: TextStyle(
                    fontSize: 24.0,
                  ),
                  validator: (value) {
                    if (value!.isEmpty) {
                      return 'Hemoglobina Glicada (HbA1c) é obrigatório';
                    }
                    return null;
                  },
                ),
                TextFormField(
                  controller: controllerldl_cholesterol,
                  decoration: InputDecoration(
                    labelText: 'Colesterol LDL',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  style: TextStyle(
                    fontSize: 24.0,
                  ),
                  validator: (value) {
                    if (value!.isEmpty) {
                      return 'Colesterol LDL é obrigatório';
                    }
                    return null;
                  },
                ),
                TextFormField(
                  controller: controllerhdl_cholesterol,
                  decoration: InputDecoration(
                    labelText: 'Colesterol HDL',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  style: TextStyle(
                    fontSize: 24.0,
                  ),
                  validator: (value) {
                    if (value!.isEmpty) {
                      return 'Colesterol HDL é obrigatório';
                    }
                    return null;
                  },
                ),
                TextFormField(
                  controller: controlleralt,
                  decoration: InputDecoration(
                    labelText: 'Alanina Aminotransferase (ALT)',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  style: TextStyle(
                    fontSize: 24.0,
                  ),
                  validator: (value) {
                    if (value!.isEmpty) {
                      return 'Alanina Aminotransferase (ALT) é obrigatório';
                    }
                    return null;
                  },
                ),
                TextFormField(
                  controller: controllerast,
                  decoration: InputDecoration(
                    labelText: 'Aspartato Aminotransferase (AST)',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  style: TextStyle(
                    fontSize: 24.0,
                  ),
                  validator: (value) {
                    if (value!.isEmpty) {
                      return 'Aspartato Aminotransferase (AST) é obrigatório';
                    }
                    return null;
                  },
                ),
                TextFormField(
                  controller: controllerheart_rate,
                  decoration: InputDecoration(
                    labelText: 'Frequência cardíaca',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  style: TextStyle(
                    fontSize: 24.0,
                  ),
                  validator: (value) {
                    if (value!.isEmpty) {
                      return 'Frequência cardíaca é obrigatório';
                    }
                    return null;
                  },
                ),
                TextFormField(
                  controller: controllercreatinine,
                  decoration: InputDecoration(
                    labelText: 'Creatinina',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  style: TextStyle(
                    fontSize: 24.0,
                  ),
                  validator: (value) {
                    if (value!.isEmpty) {
                      return 'Creatinina é obrigatório';
                    }
                    return null;
                  },
                ),
                TextFormField(
                  controller: controllertroponin,
                  decoration: InputDecoration(
                    labelText: 'Troponina',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  style: TextStyle(
                    fontSize: 24.0,
                  ),
                  validator: (value) {
                    if (value!.isEmpty) {
                      return 'Troponina é obrigatório';
                    }
                    return null;
                  },
                ),
                TextFormField(
                  controller: controllerc_reactive_protein,
                  decoration: InputDecoration(
                    labelText: 'Proteína C Reativa (PCR)',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  style: TextStyle(
                    fontSize: 24.0,
                  ),
                  validator: (value) {
                    if (value!.isEmpty) {
                      return 'Proteína C Reativa (PCR) é obrigatório';
                    }
                    return null;
                  },
                ),
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: SizedBox(
                  width: double.maxFinite,
                  child: ElevatedButton(
                    style: ButtonStyle(
                      backgroundColor: MaterialStateProperty.all(
                        Color.fromRGBO(0, 56, 168, 1.0),
                      ),
                    ),
                    onPressed: () {
                      final String name = controllername.text;
                      final String cpf = controllercpf.text;
                      final String dtnascimento = controllerdtnascimento.text;
                      final double? glucose = double.tryParse(controllerglucose.text);
                      final double? cholesterol = double.tryParse(controllercholesterol.text);
                      final double? hemoglobin = double.tryParse(controllerhemoglobin.text);
                      final double? platelets = double.tryParse(controllerplatelets.text);
                      final double? white_blood_cells = double.tryParse(controllerwhite_blood_cells.text);
                      final double? red_blood_cells = double.tryParse(controllerred_blood_cells.text);
                      final double? hematocrit = double.tryParse(controllerhematocrit.text);
                      final double? mean_corpuscular_volume = double.tryParse(controllermean_corpuscular_volume.text);
                      final double? mean_corpuscular_hemoglobin = double.tryParse(controllermean_corpuscular_hemoglobin.text);
                      final double? mean_corpuscular_hemoglobin_concentration = double.tryParse(controllermean_corpuscular_hemoglobin_concentration.text);
                      final double? insulin = double.tryParse(controllerinsulin.text);
                      final double? bmi = double.tryParse(controllerbmi.text);
                      final double? systolic_blood_pressure = double.tryParse(controllersystolic_blood_pressure.text);
                      final double? diastolic_blood_pressure = double.tryParse(controllerdiastolic_blood_pressure.text);
                      final double? triglycerides = double.tryParse(controllertriglycerides.text);
                      final double? hba1c = double.tryParse(controllerhba1c.text);
                      final double? ldl_cholesterol = double.tryParse(controllerldl_cholesterol.text);
                      final double? hdl_cholesterol = double.tryParse(controllerhdl_cholesterol.text);
                      final double? alt = double.tryParse(controlleralt.text);
                      final double? ast = double.tryParse(controllerast.text);
                      final double? heart_rate = double.tryParse(controllerheart_rate.text);
                      final double? creatinine = double.tryParse(controllercreatinine.text);
                      final double? troponin = double.tryParse(controllertroponin.text);
                      final double? c_reactive_protein = double.tryParse(controllerc_reactive_protein.text); 

                      final novoDiseasePrediction = (0, name, cpf, dtnascimento, glucose, cholesterol, hemoglobin, platelets, white_blood_cells, red_blood_cells, hematocrit, mean_corpuscular_volume, mean_corpuscular_hemoglobin, mean_corpuscular_hemoglobin_concentration, insulin, bmi, systolic_blood_pressure, diastolic_blood_pressure, triglycerides, hba1c, ldl_cholesterol, hdl_cholesterol, alt, ast, heart_rate, creatinine, troponin, c_reactive_protein);

                      widget.onDiseaseAdicionado(novoDiseasePrediction as DiseasePrediction);

                      Navigator.pop(context);
                    },
                    child: Text(
                      'Salvar',
                      style: TextStyle(
                        fontSize: 20.0,
                        color: Colors.white,
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Future postData() async {
  Uri url = Uri.parse(
      'http://488e3bd6-9441-4bc4-866b-d18912e8702f.eastus2.azurecontainer.io/score');

  final Map<String, dynamic> data = {
    'glucose': controllerglucose,
    'cholesterol': controllercholesterol,
    'hemoglobin': controllerhemoglobin,
    'platelets': controllerplatelets,
    'white_blood_cells': controllerwhite_blood_cells,
    'red_blood_cells': controllerred_blood_cells,
    'hematocrit': controllerhematocrit,
    'mean_corpuscular_volume': controllermean_corpuscular_volume,
    'mean_corpuscular_hemoglobin': controllermean_corpuscular_hemoglobin,
    'mean_corpuscular_hemoglobin_concentration':
        controllermean_corpuscular_hemoglobin_concentration,
    'insulin': controllerinsulin,
    'bmi': controllerbmi,
    'systolic_blood_pressure': controllersystolic_blood_pressure,
    'diastolic_blood_pressure': controllerdiastolic_blood_pressure,
    'triglycerides': controllertriglycerides,
    'hba1c': controllerhba1c,
    'ldl_cholesterol': controllerldl_cholesterol,
    'hdl_cholesterol': controllerhdl_cholesterol,
    'alt': controlleralt,
    'heart_rate': controllerheart_rate,
    'creatinine': controllercreatinine,
    'troponin': controllertroponin,
    'c_reactive_protein': controllerc_reactive_protein,
  };

   String requestBody = jsonEncode(data);

  if (kDebugMode) {
    print(requestBody);
  }

  try {
    final response = await http.post(
      url,
      body: requestBody,
      headers: {
        'Content-Type': 'application/json',
      },
    );

    if (response.statusCode == 200) {
      final teste = jsonDecode(response.body);

      if (teste == 1) {
        var _fullNameController;
        _mesagem = 'O Paciente ${_fullNameController.text} apresenta Anemia.';
        _exibirAlerta(context);
      }
      if (teste == 2) {
        var _fullNameController;
        _mesagem = 'O Paciente ${_fullNameController.text} Saudável.';
        _exibirAlerta(context);
      }
      if (teste == 3) {
        var _fullNameController;
        _mesagem =
            'O Paciente ${_fullNameController.text} apresenta Diabetes.';
        _exibirAlerta(context);
      }
      if (teste == 4) {
        var _fullNameController;
        _mesagem =
            'O Paciente ${_fullNameController.text} apresenta Thalasse.';
        _exibirAlerta(context);
      }
      if (teste == 5) {
        var _fullNameController;
        _mesagem =
            'O Paciente ${_fullNameController.text} apresenta Trombose.';
        _exibirAlerta(context);
      }
    }
  } catch (e) {
    print('Erro na requisição POST: $e');
  }
}

void _exibirAlerta(BuildContext context) {
  const msg = '';
  showDialog(
    context: context,
    builder: (BuildContext context) {
      return AlertDialog(
        title: Text('Paciente cadastrado com sucesso!'),
        content: Text(_mesagem!),
        actions: [
          FloatingActionButton(
            onPressed: () {
              Navigator.of(context).pushNamed("/home");
            },
            child: Text('OK'),
            backgroundColor: Color.fromRGBO(97, 105, 245, 1),
          ),
        ],
      );
    },
  );
}
}

class SelectOption {
final String value;
final String label;

const SelectOption(this.value, this.label);
}



class DatabaseHelper {
  DatabaseHelper._privateConstructor();
  static final DatabaseHelper instance = DatabaseHelper._privateConstructor();

  Future<Database> get database async {
    return await createDatabase();
  }

  Future<void> insertDisease(DiseasePrediction diseasePrediction) async {
    final db = await database;
    await db.insert('diseasepredictions', diseasePrediction.toMap(),
        conflictAlgorithm: ConflictAlgorithm.replace);
  }

  Future<List<DiseasePrediction>> findAll() async {
    final db = await database;
    final List<Map<String, dynamic>> maps = await db.query('diseasepredictions');
    return List.generate(maps.length, (i) {
      return DiseasePrediction(
        maps[i]['name'],
        maps[i]['cpf'],
        maps[i]['dtnascimento'],
        maps[i]['glucose'],
        maps[i]['cholesterol'],
        maps[i]['hemoglobin'],
        maps[i]['platelets'],
        maps[i]['white_blood_cells'],
        maps[i]['red_blood_cells'],
        maps[i]['hematocrit'],
        maps[i]['mean_corpuscular_volume'],
        maps[i]['mean_corpuscular_hemoglobin'],
        maps[i]['mean_corpuscular_hemoglobin_concentration'],
        maps[i]['insulin'],
        maps[i]['bmi'],
        maps[i]['systolic_blood_pressure'],
        maps[i]['diastolic_blood_pressure'],
        maps[i]['triglycerides'],
        maps[i]['hba1c'],
        maps[i]['ldl_cholesterol'],
        maps[i]['hdl_cholesterol'],
        maps[i]['alt'],
        maps[i]['ast'],
        maps[i]['heart_rate'],
        maps[i]['creatinine'],
        maps[i]['troponin'],
        maps[i]['c_reactive_protein'],
        maps[i]['disease'],
      );
    });
  }
}


