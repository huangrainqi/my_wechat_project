module.exports =
{
  "nested": {
    "starj_dispatch": {
      "options": {
        "java_package": "com.starj.xbrainnet",
        "java_outer_classname": "DispatchInfoProto"
      },
      "nested": {
        "vector_type": {
          "fields": {
            "x": {
              "type": "float",
              "id": 1
            },
            "y": {
              "type": "float",
              "id": 2
            },
            "z": {
              "type": "float",
              "id": 3
            }
          }
        },
        "command_type": {
          "values": {
            "DEFAULT": 0,
            "PAUSE": 1,
            "RESUME": 2,
            "SPEEDDOWN": 3,
            "PULLOVER_LEFT": 4,
            "PULLOVER_RIGHT": 5
          }
        },
        "car_info_type": {
          "fields": {
            "basetime": {
              "type": "uint64",
              "id": 1
            },
            "cloudTime": {
              "type": "uint64",
              "id": 2
            },
            "carVin": {
              "type": "string",
              "id": 3
            },
            "carStatus": {
              "type": "uint32",
              "id": 4
            },
            "localSpeed": {
              "type": "vector_type",
              "id": 5
            },
            "localPose": {
              "type": "vector_type",
              "id": 6
            },
            "localPoseAngle": {
              "type": "vector_type",
              "id": 7
            }
          }
        },
        "dispatch_info": {
          "fields": {
            "command": {
              "type": "command_type",
              "id": 1
            },
            "maxSpeed": {
              "type": "float",
              "id": 2
            },
            "parkingArea": {
              "rule": "repeated",
              "type": "vector_type",
              "id": 3
            }
          }
        },
        "dispatch_info_type": {
          "fields": {
            "selfCar": {
              "type": "car_info_type",
              "id": 1
            },
            "others": {
              "rule": "repeated",
              "type": "car_info_type",
              "id": 2
            },
            "dispatchStatus": {
              "type": "dispatch_info",
              "id": 3
            }
          }
        }
      }
    }
  }
}
