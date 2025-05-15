import 'package:avc_form/main.dart';
import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';

// CREATE DATABASE
Future<Database> createDatabase() {
  
  return getDatabasesPath().then(
    (dbPath) {
      final String path = join(
        dbPath,
        'auras.db',
      );
      return openDatabase(
        path,
        onCreate: (db, version) {
          db.execute('CREATE TABLE diseasepredictions('
                'id INTEGER PRIMARY KEY, '
                'name TEXT, '
                'cpf TEXT, '
                'dtnascimento TEXT, '
                'glucose DECIMAL, '
                'cholesterol DECIMAL, '
                'hemoglobin DECIMAL, '
                'platelets DECIMAL, '
                'white_blood_cells DECIMAL, '
                'red_blood_cells DECIMAL, '
                'hematocrit DECIMAL, '
                'mean_corpuscular_volume DECIMAL, '
                'mean_corpuscular_hemoglobin DECIMAL, '
                'mean_corpuscular_hemoglobin_concentration DECIMAL, '
                'insulin DECIMAL, '
                'bmi DECIMAL, '
                'systolic_blood_pressure DECIMAL, '
                'diastolic_blood_pressure DECIMAL, '
                'triglycerides DECIMAL, '
                'hba1c DECIMAL, '
                'ldl_cholesterol DECIMAL, '
                'hdl_cholesterol DECIMAL, '
                'alt DECIMAL, '
                'ast DECIMAL, '
                'heart_rate DECIMAL, '
                'creatinine DECIMAL, '
                'troponin DECIMAL, '
                'c_reactive_protein DECIMAL, '
                'disease INTEGER)');
        },
        version: 1,
      );
    },
  );
}

//\\//\\//\\//\\//\\//\\//\\ DISEASE PREDICTION //\\//\\//\\//\\//\\//\\//\\

// POST
Future<int> saveDisease(DiseasePrediction diseaseprediction) {
  return createDatabase().then(
    (db) {
      final Map<String, dynamic> diseasepredictionMap = {};
        diseasepredictionMap['name'] = diseaseprediction.name ;
        diseasepredictionMap['cpf'] = diseaseprediction.cpf ;
        diseasepredictionMap['dtnascimento'] = diseaseprediction.dtnascimento ;
        diseasepredictionMap['glucose'] = diseaseprediction.glucose ;
        diseasepredictionMap['cholesterol'] = diseaseprediction.cholesterol ;
        diseasepredictionMap['hemoglobin'] = diseaseprediction.hemoglobin ;
        diseasepredictionMap['platelets'] = diseaseprediction.platelets ;
        diseasepredictionMap['white_blood_cells'] = diseaseprediction.white_blood_cells ;
        diseasepredictionMap['red_blood_cells'] = diseaseprediction.red_blood_cells ;
        diseasepredictionMap['hematocrit'] = diseaseprediction.hematocrit ;
        diseasepredictionMap['mean_corpuscular_volume'] = diseaseprediction.mean_corpuscular_volume ;
        diseasepredictionMap['mean_corpuscular_hemoglobin'] = diseaseprediction.mean_corpuscular_hemoglobin ;
        diseasepredictionMap['mean_corpuscular_hemoglobin_concentration'] = diseaseprediction.mean_corpuscular_hemoglobin_concentration ;
        diseasepredictionMap['insulin'] = diseaseprediction.insulin ;
        diseasepredictionMap['bmi'] = diseaseprediction.bmi ;
        diseasepredictionMap['systolic_blood_pressure'] = diseaseprediction.systolic_blood_pressure ;
        diseasepredictionMap['diastolic_blood_pressure'] = diseaseprediction.diastolic_blood_pressure ;
        diseasepredictionMap['triglycerides'] = diseaseprediction.triglycerides ;
        diseasepredictionMap['hba1c'] = diseaseprediction.hba1c ;
        diseasepredictionMap['ldl_cholesterol'] = diseaseprediction.ldl_cholesterol ;
        diseasepredictionMap['hdl_cholesterol'] = diseaseprediction.hdl_cholesterol ;
        diseasepredictionMap['alt'] = diseaseprediction.alt ;
        diseasepredictionMap['ast'] = diseaseprediction.ast ;
        diseasepredictionMap['heart_rate'] = diseaseprediction.heart_rate ;
        diseasepredictionMap['creatinine'] = diseaseprediction.creatinine ;
        diseasepredictionMap['troponin'] = diseaseprediction.troponin ;
        diseasepredictionMap['c_reactive_protein'] = diseaseprediction.c_reactive_protein ;
        diseasepredictionMap['disease'] = diseaseprediction.disease ;
      return db.insert('diseasepredictions', diseasepredictionMap);
    },
  );
}

// GET
Future<List<DiseasePrediction>> findAllDisease() {
  return createDatabase().then(
    (db) {
      return db.query('diseasepredictions').then(
        (maps) {
          final List<DiseasePrediction> diseasepredictions = [];
          for (Map<String, dynamic> map in maps) {
            final DiseasePrediction diseaseprediction = DiseasePrediction(
                map['id'],
                map['name'],
                map['cpf'],
                map['dtnascimento'],
                map['glucose'],
                map['cholesterol'],
                map['hemoglobin'],
                map['platelets'],
                map['white_blood_cells'],
                map['red_blood_cells'],
                map['hematocrit'],
                map['mean_corpuscular_volume'],
                map['mean_corpuscular_hemoglobin'],
                map['mean_corpuscular_hemoglobin_concentration'],
                map['insulin'],
                map['bmi'],
                map['systolic_blood_pressure'],
                map['diastolic_blood_pressure'],
                map['triglycerides'],
                map['hba1c'],
                map['ldl_cholesterol'],
                map['hdl_cholesterol'],
                map['alt'],
                map['ast'],
                map['heart_rate'],
                map['creatinine'],
                map['troponin'],
                map['c_reactive_protein'],
            );
            diseasepredictions.add(diseaseprediction);
          }
          return diseasepredictions;
        },
      );
    },
  );
}
